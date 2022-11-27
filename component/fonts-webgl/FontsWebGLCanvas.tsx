import React, { FC, useEffect, useRef } from "react"
import { useFontsWebGL } from "../../fonts-webgl/useFontsWebGL"
import { ShaderProgram } from "../../util/gl/shader"

type Props = {
    
}

export const FontsWebGLCanvas: FC<Props> = ({ }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    useFontsWebGL(canvasRef)

    return (<>
        <canvas 
            width={800} 
            height={600} ref={canvasRef}
            className="border-fg border-2"
        ></canvas>
    </>)
}