import { fontMaskFragSrc, fontMaskVertSrc, fontShadeFragSrc, fontShadeVertSrc } from './../component/fonts-webgl/shaders';
import { mat4, vec3, vec4 } from "gl-matrix";
import { MutableRefObject, RefObject, useCallback, useEffect, useRef } from "react";
import { ShaderProgram } from "../util/gl/shader";

import { colorVec4 } from '../util/gl/color';
import { getCharGlyph, getGlyphPath, glyphScaleFac, loadFont, ParsedFont, parseGlyphPath } from '../util/font';
import { bezierPointsAntigrain, bezierPointsT } from '../adaptive-bezier/sample';
import { Point } from '../adaptive-bezier/types';
import { FontRendererGL } from './draw';
import { colors } from "../colors"

async function init(gl: WebGL2RenderingContext, font: ParsedFont, canvas: HTMLCanvasElement, fontRendererRef: MutableRefObject<FontRendererGL|undefined>, fontSize: number) {
    // const font = await getFont("/font/times-new-roman.ttf")



    // TODO: resizable
    const { width, height } = canvas

    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    canvas.width *= window.devicePixelRatio
    canvas.height *= window.devicePixelRatio

    gl.viewport(0, 0, canvas.width, canvas.height)

    const fontRenderer = new FontRendererGL(
        gl, font, fontSize
    )

    fontRendererRef.current = fontRenderer

    return fontRenderer
}

function renderGL(
    elapsed: number,
    canvas: HTMLCanvasElement,
    fontRenderer: FontRendererGL,
    content: string,
) {
    // TODO: resizable
    let { width, height } = canvas

    width /= window.devicePixelRatio
    height /= window.devicePixelRatio

    const gl = canvas.getContext("webgl2")!

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    fontRenderer.drawString(
        content,
        getProjectionMatrix(width, height), 
        width, 
        height,
        width,
        elapsed / 1000,
        colorVec4(colors.main),
        colorVec4(colors.acc),
        // vec4.fromValues(1.0, 0.0, 0.0, 1.0)
    )
}

export function useFontsWebGL(canvasRef: RefObject<HTMLCanvasElement>, content: string, font: ParsedFont, fontSize: number) {
    const fontRendererRef = useRef<FontRendererGL>()
    const initialized = useRef<boolean>()
    const contentRef = useRef<string>(content)

    const render = (elapsed: number) => {
        if(!fontRendererRef.current || !canvasRef.current) return
        renderGL(elapsed, canvasRef.current, fontRendererRef.current, contentRef.current)
    }

    useEffect(() => {
        contentRef.current = content
    }, [content])

    useEffect(() => {
        fontRendererRef?.current?.setFont(font)
    }, [font])

    useEffect(() => {
        fontRendererRef?.current?.setFontSize(fontSize)
    }, [fontSize])

    useEffect(() => {
        if(initialized.current || !canvasRef.current) return
        initialized.current = true

        const canvas = canvasRef.current
        const gl = canvas.getContext('webgl2', { stencil: true, antialias: true })

        if(!gl) {
            // TODO: display this info somehow
            return
        }

        init(gl, font, canvas, fontRendererRef, fontSize)
            .then(fr => {
                let start: number|undefined, previousTimeStamp: number|undefined

                const step: FrameRequestCallback = (timestamp) => {
                    if(start === undefined) {
                        start = timestamp
                    }

                    const elapsed = timestamp - start

                    if(previousTimeStamp !== timestamp) {
                        render(elapsed)
                    }

                    previousTimeStamp = timestamp
                    window.requestAnimationFrame(step)
                }

                window.requestAnimationFrame(step)
            })
    }, [canvasRef, font])
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