import { List } from "ts-toolbelt"

export type CubicBezier<Pt = Point> = List.Repeat<Pt, 4>
export type Point = [ number, number ]

export interface BezierDrawConfig {
    controlPointRadius: number
    controlPointColor: string

    bezierPointRadius: number
    bezierPointColor: string|[string, string]
    enableBezierPoints: boolean

    strokeWidth: number
    strokeColor: string
    enableStroke: boolean

    innerStrokeWidth: number
    innerStrokeColor: string
    enableInnerStroke: boolean

    controlStrokeWidth: number
    controlStrokeColor: string
}