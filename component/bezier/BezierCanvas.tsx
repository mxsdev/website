"use client"

import { darken, saturate } from "color2k"
import { useEffect, useRef } from "react"
import { BezierContext, bezierMap } from "../../adaptive-bezier/draw"
import { BezierDrawConfig, CubicBezier } from "../../adaptive-bezier/types"
import { useBezier } from "../../adaptive-bezier/useBezier"

import { colors } from "../../colors"

interface Props {
    options?: Partial<BezierDrawConfig>
    className?: string
    width?: number
    height?: number
}

export const BezierCanvas: React.FunctionComponent<Props> = ({ width = 480, height = 480, className, ...props }) => {
    const ref = useRef<HTMLCanvasElement>(null)

    useBezier(
        ref, 
        bezierConfigDefaults(props.options),
        defaultInitial(width, height)
    )
    
    return (
        <>
            <canvas 
                width={width}
                height={height}
                ref={ref}
                className={className}
                style={{
                    maxWidth: width
                }}
            ></canvas>
        </>
    )
}

function bezierConfigDefaults(config: Partial<BezierDrawConfig> = {}): BezierDrawConfig {
    const strokeWidth = config.strokeWidth ?? 6
    const enableStroke = config.enableStroke ?? true

    return {
        controlPointRadius: enableStroke ? Math.max(7, strokeWidth * 1.05) : 7,
        controlPointColor: "#FFFFFF",

        bezierPointRadius: 2,
        bezierPointColor: [ colors.main, darken(colors.acc, 0.2) ],
        enableBezierPoints: true,

        strokeWidth,
        strokeColor: "#FFFFFF",
        enableStroke,

        innerStrokeWidth: 3,
        innerStrokeColor: "#000000",
        enableInnerStroke: false,

        controlStrokeWidth: 1,
        controlStrokeColor: "#FFFFFF",

        ...config
    }
}

function defaultInitial(width: number, height: number): CubicBezier {
    const d = 200

    const [ cx, cy ] = [ width/2, height/2 ]

    return bezierMap([
        [ cx, cy - d ],
        [ cx - d, cy ],
        [ cx + d, cy ],
        [ cx, cy + d ],
    ], ([x, y]) => ([x, y]))
}