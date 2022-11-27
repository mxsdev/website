import { CubicBezier, Point } from './../adaptive-bezier/types';
import { Typr, TyprU } from 'typr-ts';
import assert from 'assert';

export type GlyphId = number & { readonly __glyphId: never }

interface ParsedFont {
    head: {
        unitsPerEm: number,
    },
    hmtx: {
        aWidth: number[],
        lsBearing: number[],
    }
}

type GlyphCommand = "M"|"L"|"Q"|"C"|"Z"|`#${string}`|"X"

interface GlyphPath {
    cmds: GlyphCommand[],
    crds: number[]
}

interface GlyphInfo {
    aWidth: number,
    lsBearing: number,
}

export async function loadFont(url: string): Promise<ParsedFont> {
    return await fetch("/font/times-new-roman.ttf")
        .then(res => res.arrayBuffer())
        .then(buff => Typr.parse(buff))
}

export function getCharGlyph(font: ParsedFont, code: number): GlyphId {
    return TyprU.codeToGlyph(font, code)
}

export function getGlyphPath(font: ParsedFont, gid: GlyphId): GlyphPath {
    return TyprU.glyphToPath(font, gid)
}

export function getGlyphInfo(font: ParsedFont, gid: GlyphId): GlyphInfo {
    return {
        aWidth: font.hmtx.aWidth[gid],
        lsBearing: font.hmtx.lsBearing[gid],
    }
}

export function parseGlyphPath(
    path: GlyphPath,
    line: (segment: [Point, Point]) => void,
    cubic: (segment: CubicBezier) => void,
    finish: (segment: [Point, Point]) => boolean|void,
) {
    let lastPoint: Point|undefined
    let firstPoint: Point|undefined

    let i = 0

    function point(): Point {
        return [
            path.crds[i++],
            path.crds[i++],
        ]
    }

    function setLastPoint(pt: Point) {
        lastPoint = pt

        if(!firstPoint) {
            firstPoint = pt
        }
    }

    function finishShape() {
        firstPoint = undefined
    }

    for(const char of path.cmds) {
        switch(char) {
            case "M": {
                setLastPoint(point())
                break
            }

            case "L": {
                assert(lastPoint)
                const toPt = point()

                line([
                    [...lastPoint],
                    [...toPt],
                ])

                setLastPoint(toPt)

                break
            }

            case "Q": {
                assert(lastPoint)
                const [ qp0, qp1, qp2 ] = [ lastPoint, point(), point() ]

                // convert quadratic to cubic
                // see: https://fontforge.org/docs/techref/bezier.html#converting-truetype-to-postscript
                cubic([
                    [...qp0],
                    [
                        qp0[0] + (2/3) * (qp1[0] - qp0[0]),
                        qp0[1] + (2/3) * (qp1[1] - qp0[1]),
                    ],
                    [
                        qp2[0] + (2/3) * (qp1[0] - qp2[0]),
                        qp2[1] + (2/3) * (qp1[1] - qp2[1]),
                    ],
                    [...qp2],
                ])

                setLastPoint(qp2)

                break
            }

            case "C": {
                assert(lastPoint)

                const [ cp1, cp2, cp3 ] = [point(), point(), point()]

                cubic([
                    [...lastPoint],
                    [...cp1],
                    [...cp2],
                    [...cp3],
                ])

                setLastPoint(cp3)

                break
            }

            case "Z": {
                assert(lastPoint)
                assert(firstPoint)

                const abort = finish([
                    [...lastPoint],
                    [...firstPoint],
                ])

                if(abort === false) {
                    return
                }

                setLastPoint(firstPoint)
                finishShape()

                break
            }

            default: {
                // do nothing (svg fonts)
                break
            }
        }
    }
}

export function glyphScaleFac(font: ParsedFont, px: number) {
    return font.head.unitsPerEm / px
}