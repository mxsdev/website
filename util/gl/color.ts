import { parseToRgba } from "color2k";
import { vec4 } from "gl-matrix";

export function colorVec4(color: string): vec4 {
    const [r, g, b, a] = parseToRgba(color);

    return [
        r / 255.0,
        g / 255.0,
        b / 255.0,
        a
    ]
}