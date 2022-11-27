import { fontMaskFragSrc, fontMaskVertSrc, fontShadeFragSrc, fontShadeVertSrc } from './../component/fonts-webgl/shaders';
import { mat3, mat4, vec3 } from "gl-matrix";
import { RefObject, useEffect, useRef } from "react";
import { ShaderProgram } from "../util/gl/shader";

import { colors } from "../colors"
import { colorVec4 } from '../util/gl/color';
import { Typr, TyprU } from "typr-ts"
import { getCharGlyph, getGlyphPath, glyphScaleFac, loadFont, parseGlyphPath } from '../util/font';
import { bezierMap } from '../adaptive-bezier/draw';
import { bezierPointsAntigrain, bezierPointsT } from '../adaptive-bezier/sample';
import { Point } from '../adaptive-bezier/types';
import { calculateSizeAdjustValues } from 'next/dist/server/font-utils';

// const shapeData = new Float32Array([
//     300, 350,
//     20, 150,
//     150, 60,
//     150, 120,
//     250, 120,
//     225, 60,
//     600, 200,
//     650, 300,
// ])

async function init(gl: WebGL2RenderingContext, canvas: HTMLCanvasElement) {
    const font = await loadFont("/font/times-new-roman.ttf")
    const glyphId = getCharGlyph(font, "B".charCodeAt(0))

    console.log(font)

    const fontSize = 200;
    const model = mat4.create()
    mat4.translate(model, model, vec3.fromValues(0, fontSize, 0))

    const glyphBezierSegments: Point[][] = []
    let glyphBezierShape: Point[] = []

    const sf = glyphScaleFac(font, fontSize)

    parseGlyphPath(
        getGlyphPath(font, glyphId),
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
    const sizedBezier = glyphBezierPts.map(([x, y]) => [x / sf, -y / sf])

    const shapeData = new Float32Array(
        sizedBezier.flatMap(x => x)
    )

    const { width, height } = canvas

    gl.viewport(0, 0, width, height)

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    const maskShader = new ShaderProgram(gl, fontMaskVertSrc, fontMaskFragSrc)
    const fillShader = new ShaderProgram(gl, fontShadeVertSrc, fontShadeFragSrc)

    const maskVBO = gl.createBuffer()!
    const maskVAO = gl.createVertexArray()!

    gl.bindVertexArray(maskVAO)
        gl.bindBuffer(gl.ARRAY_BUFFER, maskVBO)
        {
            gl.bufferData(gl.ARRAY_BUFFER, shapeData, gl.STATIC_DRAW)

            gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 2 * shapeData.BYTES_PER_ELEMENT, 0);
            gl.enableVertexAttribArray(0);

        }    
        gl.bindBuffer(gl.ARRAY_BUFFER, null)
    gl.bindVertexArray(null)

    const screenVAO = gl.createVertexArray()
    const screenVBO = gl.createBuffer()

    gl.bindVertexArray(screenVAO)
            gl.bindBuffer(gl.ARRAY_BUFFER, screenVBO)
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
    
    // render
    gl.enable(gl.STENCIL_TEST)
        gl.clear(gl.STENCIL_BUFFER_BIT)
        maskShader.use()
        gl.bindVertexArray(maskVAO)
            gl.bindAttribLocation(maskShader.id, 0, "aPos")
            maskShader.setMat4("projection", getProjectionMatrix(width, height))
            maskShader.setMat4("model", model)

            gl.stencilFunc(gl.NEVER, 0, 0xFF)
            gl.stencilOp(gl.INVERT, gl.INVERT, gl.INVERT)

            let idx = 0
            for(const shape of glyphBezierSegments) {
                gl.drawArrays(gl.TRIANGLE_FAN, idx, shape.length)
                idx += shape.length
            }

        gl.bindVertexArray(null)

        fillShader.use()
        fillShader.setInt("ww", width)
        fillShader.setInt("wh", height)
        fillShader.setVec4("col1", colorVec4(colors.main))
        fillShader.setVec4("col2", colorVec4(colors.acc))
        gl.bindVertexArray(screenVAO)
            gl.bindAttribLocation(fillShader.id, 0, "aPos")
            
            gl.stencilFunc(gl.EQUAL, 0xFF, 0xFF)
            gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP)
    
            gl.drawArrays(gl.TRIANGLES, 0, 6)
        gl.bindVertexArray(null)
    gl.disable(gl.STENCIL_TEST)
}

export function useFontsWebGL(canvasRef: RefObject<HTMLCanvasElement>) {
    const initialized = useRef<boolean>(false)

    useEffect(() => {
        if(initialized.current || !canvasRef.current) return
        initialized.current = true

        const canvas = canvasRef.current
        const gl = canvas.getContext('webgl2', { stencil: true })

        if(!gl) {
            // TODO: display this info somehow
            return
        }

        init(gl, canvas)
    }, [canvasRef])
}

function getProjectionMatrix(width: number, height: number): mat4 {
    const projection = mat4.create()
    
    mat4.scale(projection, projection, vec3.fromValues(1, -1, 1))
    mat4.translate(projection, projection, vec3.fromValues(-1, -1, 0))
    mat4.scale(projection, projection, vec3.fromValues(2, 2, 1))
    mat4.scale(projection, projection, vec3.fromValues(1 / width, 1 / height, 1))

    // const vec = vec3.fromValues(400, 300, 0)
    // console.log(vec3.transformMat4(vec, vec, projection))

    return projection
}