import { mat4, ReadonlyMat4, vec2, vec3, vec4 } from "gl-matrix";
import { off } from "process";
import { BsSkipStartCircleFill } from "react-icons/bs";
import { bezierPointsAntigrain } from "../adaptive-bezier/sample";
import { Point } from "../adaptive-bezier/types";
import { fontMaskVertSrc, fontMaskFragSrc, fontShadeVertSrc, fontShadeFragSrc } from "../component/fonts-webgl/shaders";
import { compareFonts, getCharGlyph, getGlyphInfo, getGlyphPath, GlyphId, glyphScaleFac, ParsedFont, parseGlyphPath } from "../util/font";
import { ShaderProgram } from "../util/gl/shader";

type GlyphCache = Map<GlyphId, {
    VAO: WebGLVertexArrayObject,
    VBO: WebGLBuffer,
    polys: [index: number, size: number][],
}>;

export class FontRendererGL {
    private glyphs: GlyphCache = new Map()

    private screenVAO: WebGLVertexArrayObject
    private screenVBO: WebGLBuffer

    private maskShader: ShaderProgram
    private fillShader: ShaderProgram
    
    constructor(
        private gl: WebGL2RenderingContext, 
        private font: ParsedFont,
        private fontSize: number = 40,
    ) { 
        console.log(font)
        this.populateGlyphCache()

        this.maskShader = new ShaderProgram(gl, fontMaskVertSrc, fontMaskFragSrc)
        this.fillShader = new ShaderProgram(gl, fontShadeVertSrc, fontShadeFragSrc)

        this.screenVAO = gl.createVertexArray()!
        this.screenVBO = gl.createBuffer()!
    
        gl.bindVertexArray(this.screenVAO)
                gl.bindBuffer(gl.ARRAY_BUFFER, this.screenVBO)
                {
                    const data = new Float32Array([
                        -1, 1,
                        -1, -1,
                        1, -1,
                        1, -1,
                        1, 1,
                        -1, 1
                    ])
    
                    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
    
                    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 2 * data.BYTES_PER_ELEMENT, 0)
                    gl.enableVertexAttribArray(0)
                }
                gl.bindBuffer(gl.ARRAY_BUFFER, null)
        gl.bindVertexArray(null)
    }

    setFont(font: ParsedFont) {
        const repopulate = !compareFonts(this.font, font)

        this.font = font

        if(repopulate) this.populateGlyphCache()
    }

    setFontSize(size: number) {
        const repopulate = Math.ceil(size) !== Math.ceil(this.fontSize)
        
        this.fontSize = size

        if(repopulate) this.populateGlyphCache()
    }

    private getScaleFac(ub = false) {
        return glyphScaleFac(this.font, ub ? Math.ceil(this.fontSize) : this.fontSize )
    }

    drawString(
        content: string,
        projection: ReadonlyMat4, 
        width: number,
        height: number,
        maxWidth = Infinity, 
        elapsedSeconds: number,
        col1: vec4 = vec4.fromValues(1.0, 1.0, 1.0, 1.0),
        col2: vec4 = vec4.fromValues(1.0, 1.0, 1.0, 1.0),
        transform?: mat4,
    ) {
        const modelBase = mat4.create()

        const sf = this.getScaleFac();
        const lineHeight = this.font.head.yMax

        mat4.scale(modelBase, modelBase, vec3.fromValues(1/sf, -1/sf, 1))

        if(transform) {
            mat4.mul(modelBase, modelBase, transform)
        }

        const spaceGlyph = getCharGlyph(this.font, " ".charCodeAt(0))
        const spaceInfo = getGlyphInfo(this.font, spaceGlyph)
        const spaceDist = spaceInfo!.aWidth

        let xoffs = 0;
        let yoffs = lineHeight
        
        const newLine = () => {
            xoffs = 0
            yoffs += lineHeight
        }

        let charID = 0;

        for(const word of content.split(" ")) {
            if(word === "") {
                xoffs += spaceDist
                continue
            }

            const wordSize = Array.from(word)
                .reduce((prev, curr) => prev + (getGlyphInfo(this.font, getCharGlyph(this.font, curr.charCodeAt(0)))?.aWidth ?? 0), 0)

            // word wrap
            if(wordSize + xoffs >= maxWidth * sf ) {
                newLine()
            }

            for(const c of word) {
                if(c === "\n") {
                    newLine()
                    continue
                }
    
                const code = c.charCodeAt(0)
                const gid = getCharGlyph(this.font, code)
    
                const glyphInfo = getGlyphInfo(this.font, gid)
                const glyphBuffers = this.glyphs.get(gid)
    
                if(!glyphInfo || !glyphBuffers) continue
    
                const { aWidth, glyf: { xMax, xMin, yMax, yMin } } = glyphInfo
                const { VAO, polys } = glyphBuffers
    
                // render
                this.gl.enable(this.gl.STENCIL_TEST)
                    this.gl.clear(this.gl.STENCIL_BUFFER_BIT)
                    this.maskShader.use()
                    this.gl.bindVertexArray(VAO)
                        this.gl.stencilFunc(this.gl.NEVER, 0, 0xFF)
                        this.gl.stencilOp(this.gl.INVERT, this.gl.INVERT, this.gl.INVERT)
    
                        const model = mat4.create();

                        mat4.mul(model, model, modelBase)
                        mat4.translate(model, model, vec3.fromValues(xoffs, -yoffs, 0))

                        this.gl.bindAttribLocation(this.maskShader.id, 0, "aPos")
                        this.maskShader.setMat4("projection", projection)
                        this.maskShader.setMat4("model", model)
                        this.maskShader.setFloat("time", elapsedSeconds)
                        this.maskShader.setInt("charID", charID++)
                        this.maskShader.setVec2("origin", vec2.fromValues((xMin + xMax)/1, (yMin + yMax)/2))

                        for(const [i, l] of polys) {
                            this.gl.drawArrays(this.gl.TRIANGLE_FAN, i, l)
                        }
                    this.gl.bindVertexArray(null)
    
                    // TODO: make this a single render call
                    this.fillShader.use()
                    this.fillShader.setInt("ww", width)
                    this.fillShader.setInt("wh", height)
                    this.fillShader.setVec4("col1", col1)
                    this.fillShader.setVec4("col2", col2)
                    this.fillShader.setFloat("time", elapsedSeconds)
                    this.gl.bindVertexArray(this.screenVAO)
                        this.gl.bindAttribLocation(this.fillShader.id, 0, "aPos")
                        
                        this.gl.stencilFunc(this.gl.EQUAL, 0xFF, 0xFF)
                        this.gl.stencilOp(this.gl.KEEP, this.gl.KEEP, this.gl.KEEP)
                
                        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6)
                    this.gl.bindVertexArray(null)
                this.gl.disable(this.gl.STENCIL_TEST)
    
                xoffs += aWidth
            }
            
            xoffs += spaceDist
        }

    }

    populateGlyphCache(glyphSet?: Set<GlyphId>) {
        console.log("Populating glyph cache", this.font.name.fontFamily)

        if(!glyphSet) {
            glyphSet = new Set()

            for(const c of " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-_=+[{]}\|'\";:,<.>/?`~") {
                const code = c.charCodeAt(0)
                const gid = getCharGlyph(this.font, code)

                glyphSet.add(gid)
            }
        }

        const sf = this.getScaleFac(true)

        for(const gid of glyphSet) {
            const { VBO: originalVBO, VAO: originalVAO } = this.glyphs.get(gid) ?? {}

            const path = getGlyphPath(this.font, gid)
    
            if(!path) {
                continue
            }
    
            const glyphBezierSegments: Point[][] = []
            let glyphBezierShape: Point[] = []
        
            parseGlyphPath(
                path,
                ([from, to]) => {
                    glyphBezierShape.push(from)
                },
                (segment) => {
                    glyphBezierShape.push(segment[0])
                    glyphBezierShape.push(...bezierPointsAntigrain(segment, sf))
                },
                ([from, to]) => {
                    glyphBezierShape.push(from)
                    glyphBezierSegments.push(glyphBezierShape)
                    glyphBezierShape = []
                }
            )
        
            const glyphBezierPts = glyphBezierSegments.flatMap(x => x)
    
            const VBO = originalVBO ?? this.gl.createBuffer()!
            const VAO = originalVAO ?? this.gl.createVertexArray()!
        
            this.gl.bindVertexArray(VAO)
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, VBO)
                {
                    const shapeData = new Float32Array(glyphBezierPts.flatMap(x => x))
    
                    this.gl.bufferData(this.gl.ARRAY_BUFFER, shapeData, this.gl.STATIC_DRAW)
        
                    if(!originalVAO) {
                        this.gl.vertexAttribPointer(0, 2, this.gl.FLOAT, false, 2 * shapeData.BYTES_PER_ELEMENT, 0);
                        this.gl.enableVertexAttribArray(0);
                    }
                }    
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null)
            this.gl.bindVertexArray(null)

            let ct = 0
            const polys: [number, number][] = glyphBezierSegments.map(v => {
                const i = ct
                ct += v.length
                return [i, v.length]
            })
    
            this.glyphs.set(gid, {
                VAO, VBO, polys
            })

            // const sizedBezier = glyphBezierPts.map(([x, y]) => [x / sf, -y / sf])
        }

    }
}