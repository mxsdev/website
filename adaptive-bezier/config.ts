import { BezierDrawConfig } from "./types"

export function bezierConfigDefaults(config: Partial<BezierDrawConfig> = {}): BezierDrawConfig {
    return {
        controlPointRadius: 7,
        controlPointColor: "#FFFFFF",

        bezierPointRadius: 2.5,
        bezierPointColor: "#FF33CC",

        strokeWidth: 6,
        strokeColor: "#FFFFFF",

        innerStrokeWidth: 3,
        innerStrokeColor: "#000000",

        controlStrokeWidth: 1,
        controlStrokeColor: "#FFFFFF",

        enableBezierPoints: true,
        enableInnerStroke: false,
        enableStroke: false,

        ...config
    }
}
