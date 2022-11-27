"use client"

import { vec4 } from "gl-matrix"
import React, { FC, useEffect, useRef } from "react"
import { useFontsWebGL } from "../../fonts-webgl/useFontsWebGL"
import { ParsedFont } from "../../util/font"
import { ShaderProgram } from "../../util/gl/shader"

type Props = {
    content: string
    font: ParsedFont
}

export const FontsWebGLCanvas: FC<Props> = ({ content, font }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useFontsWebGL(
        canvasRef,
        content,
        font,
        30,
    )

    return (<>
        <canvas 
            width={800} 
            height={600} ref={canvasRef}
            className="border-fg border-2"
        ></canvas>
    </>)
}