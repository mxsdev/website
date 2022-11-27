import { fontMaskFragSrc, fontMaskVertSrc, fontShadeFragSrc, fontShadeVertSrc } from './../component/fonts-webgl/shaders';
import { mat4, vec3 } from "gl-matrix";
import { MutableRefObject, RefObject, useEffect, useRef } from "react";
import { ShaderProgram } from "../util/gl/shader";

import { colors } from "../colors"
import { colorVec4 } from '../util/gl/color';
import { getCharGlyph, getGlyphPath, glyphScaleFac, loadFont, parseGlyphPath } from '../util/font';
import { bezierPointsAntigrain, bezierPointsT } from '../adaptive-bezier/sample';
import { Point } from '../adaptive-bezier/types';
import { FontRendererGL } from './draw';

async function init(gl: WebGL2RenderingContext, canvas: HTMLCanvasElement, fontRendererRef: MutableRefObject<FontRendererGL|undefined>) {
    const font = await loadFont("/font/times-new-roman.ttf")

    const { width, height } = canvas

    gl.viewport(0, 0, width, height)

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    const maskShader = new ShaderProgram(gl, fontMaskVertSrc, fontMaskFragSrc)
    const fillShader = new ShaderProgram(gl, fontShadeVertSrc, fontShadeFragSrc)
    
    const fontRenderer = new FontRendererGL(
        gl, getProjectionMatrix(width, height),
        maskShader, fillShader, font
    )

    fontRendererRef.current = fontRenderer

    fontRenderer.drawString("test content\nnew line")
}

export function useFontsWebGL(canvasRef: RefObject<HTMLCanvasElement>) {
    const fontRendererRef = useRef<FontRendererGL>()
    const initialized = useRef<boolean>()

    useEffect(() => {
        if(initialized.current || !canvasRef.current) return
        initialized.current = true

        const canvas = canvasRef.current
        const gl = canvas.getContext('webgl2', { stencil: true })

        if(!gl) {
            // TODO: display this info somehow
            return
        }

        init(gl, canvas, fontRendererRef)
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