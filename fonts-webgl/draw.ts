import { mat4, ReadonlyMat4, vec3 } from "gl-matrix";
import { bezierPointsAntigrain } from "../adaptive-bezier/sample";
import { Point } from "../adaptive-bezier/types";
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
    
    constructor(
        private gl: WebGL2RenderingContext, 
        private projection: ReadonlyMat4,
        private maskShader: ShaderProgram,
        private fillShader: ShaderProgram,
        private font: ParsedFont,
        private fontSize: number = 40,
    ) { 
        console.log(font)
        this.populateGlyphCache()

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

    setProjectionMatrix(projection: ReadonlyMat4) {
        this.projection = projection
    }

    setFont(font: ParsedFont) {
        const repopulate = compareFonts(this.font, font)

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

    drawString(content: string, maxWidth = Infinity, transform?: mat4) {
        const modelBase = mat4.create()

        const sf = this.getScaleFac();
        const lineHeight = this.font.head.yMax

        // mat4.translate(modelBase, modelBase, vec3.fromValues(0, lineHeight, 0))
        mat4.scale(modelBase, modelBase, vec3.fromValues(1/sf, -1/sf, 1))

        if(transform) {
            mat4.mul(modelBase, modelBase, transform)
        }

        let xoffs = 0;
        let yoffs = lineHeight
        
        const newLine = () => {
            xoffs = 0
            yoffs += lineHeight
        }

        for(const c of content) {
            if(c === "\n") {
                newLine()
                continue
            }

            const code = c.charCodeAt(0)
            const gid = getCharGlyph(this.font, code)

            const glyphInfo = getGlyphInfo(this.font, gid)
            const glyphBuffers = this.glyphs.get(gid)

            if(!glyphInfo || !glyphBuffers) continue

            const { aWidth } = glyphInfo
            const { VAO, polys } = glyphBuffers

            // render
            this.gl.enable(this.gl.STENCIL_TEST)
                this.gl.clear(this.gl.STENCIL_BUFFER_BIT)
                this.maskShader.use()
                this.gl.bindVertexArray(VAO)
                    this.gl.stencilFunc(this.gl.NEVER, 0, 0xFF)
                    this.gl.stencilOp(this.gl.INVERT, this.gl.INVERT, this.gl.INVERT)

                    for(const [i, l] of polys) {
                        const model = mat4.create();

                        mat4.mul(model, model, modelBase)
                        mat4.translate(model, model, vec3.fromValues(xoffs, -yoffs, 0))

                        this.gl.bindAttribLocation(this.maskShader.id, 0, "aPos")
                        this.maskShader.setMat4("projection", this.projection)
                        this.maskShader.setMat4("model", model)
    
                        this.gl.drawArrays(this.gl.TRIANGLE_FAN, i, l)
                    }
                this.gl.bindVertexArray(null)

                this.fillShader.use()
                // fillShader.setInt("ww", width)
                // fillShader.setInt("wh", height)
                // fillShader.setVec4("col1", colorVec4(colors.main))
                // fillShader.setVec4("col2", colorVec4(colors.acc))
                this.gl.bindVertexArray(this.screenVAO)
                    this.gl.bindAttribLocation(this.fillShader.id, 0, "aPos")
                    
                    this.gl.stencilFunc(this.gl.EQUAL, 0xFF, 0xFF)
                    this.gl.stencilOp(this.gl.KEEP, this.gl.KEEP, this.gl.KEEP)
            
                    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6)
                this.gl.bindVertexArray(null)
            this.gl.disable(this.gl.STENCIL_TEST)

            xoffs += aWidth
        }
    }

    populateGlyphCache(glyphSet?: Set<GlyphId>) {
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
    
                    if(!originalVBO) {
                        this.gl.bufferData(this.gl.ARRAY_BUFFER, shapeData, this.gl.STATIC_DRAW)
                    } else {
                        this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, shapeData)
                    }
        
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