import { curvatureMaxima } from "./curvature"
import { CubicBezier, Point } from "./types"

const CONTROL_RADIUS = 5

const NUM_GQ = 12
const BEZ_SW = 6

function bezierPointsN(N: number, points: CubicBezier) {
    const [ p1, p2, p3, p4 ] = points

    return (new Array(N).fill(undefined)
      .map((_, i) => i))
      .map(i => (i+1)/(N+1))
      .map((t) => ([ bezier3vec(t, points), bezier3pvec(t, points), t ]))
}

export function bezierPointsT(bezier: CubicBezier, sw: number, cmaxima?: [number, number][], t0=0, t1=1, threshold = 0.05, depth=0): [pt: Point, t: number][] {
     cmaxima ??= curvatureMaxima(bezier).map(t => ([
      t, beziercurvaturerad(t, bezier)
    ]))

    if(depth >= 16) return [ ]
    
    const [ p1, p2, p3, p4 ] = bezier

    const lengthub = bezierlengthub(0, 1, bezier)
    const mincurvature = mincurvaturerad(cmaxima, t0, t1, bezier)

    const stroke_scalefac = 1 + (sw / mincurvature)
    const zerolen = 0.5 / stroke_scalefac

    if(lengthub * lengthub < zerolen * zerolen + 2 * zerolen * mincurvature) return [ ]

    const t = 0.5

    const pt1_1 = lerp(p1, p2, t)
    const pt1_2 = lerp(p2, p3, t)
    const pt1_3 = lerp(p3, p4, t)

    const pt2_1 = lerp(pt1_1, pt1_2, t)
    const pt2_2 = lerp(pt1_2, pt1_3, t)

    const pt3 = lerp(pt2_1, pt2_2, t)

    return [
        ...bezierPointsT([ p1, pt1_1, pt2_1, pt3 ], sw, cmaxima, t0, (t0+t1)/2, threshold, depth + 1),
        [pt3, (t0+t1)/2],
        ...bezierPointsT([ pt3, pt2_2, pt1_3, p4 ], sw, cmaxima, (t0+t1)/2, t1, threshold, depth + 1)
    ]
}

function lerp(p1: Point, p2: Point, fac: number): Point {
    return [
        p1[0] + (fac)*(p2[0]-p1[0]),
        p1[1] + (fac)*(p2[1]-p1[1]),
    ]
}

function beziercurvatureInt(a: number, b: number, bezier: CubicBezier) {
    let res = 0
    
    const N = 10
    
    for (let i = 0; i < N; i++) {
        const t = i/N
    
        res += Math.abs(beziercurvature(t, bezier)) * (1/N)
    }

    return res
}

function bezierlengthub(a: number, b: number, [ p1, p2, p3, p4 ]: CubicBezier) {
    return distance(p1, p2) + distance(p2, p3) + distance(p3, p4) + distance(p4, p1)
}

function distance(p1: Point, p2: Point) {
    return Math.sqrt((p2[0] - p1[0])**2 + (p2[1] - p1[1])**2)
}

function bezierlength(a: number, b: number, bezier: CubicBezier) {
    let res = 0

    let N = 10

    for(let i = 0; i < N; i++) {
        const x = i/N

        const [ xp, yp ] = bezier3pvec(x, bezier)
        res += Math.sqrt(xp**2 + yp**2) * (1/N)
    }

    return res
}

// TODO: points should be destructured from "CubicBezier", not provided as args
export function beziercurvature(t: number, bezier: CubicBezier) {
    const [ xp, yp ] = bezier3pvec(t, bezier)
    const [ xpp, ypp ] = bezier3ppvec(t, bezier)

    return (xp * ypp - xpp * yp) / Math.pow( xp**2 + yp**2, 3/2 )
}

function beziercurvaturerad(t: number, bezier: CubicBezier) {
    const [ xp, yp ] = bezier3pvec(t, bezier)
    const [ xpp, ypp ] = bezier3ppvec(t, bezier)

    const den = (xp * ypp - xpp * yp)
    const nom = Math.pow( xp**2 + yp**2, 3/2 )

    const res = nom / den

    if(Number.isNaN(res)) {
      return Infinity
    }

    return Math.abs(res)
}

function mincurvaturerad(cmaxima: [number, number][], t0: number, t1: number, bezier: CubicBezier) {
  return Math.min(
    beziercurvaturerad(t0, bezier),
    beziercurvaturerad(t1, bezier),
    ...cmaxima
      .filter(([t]) => t > t0 && t < t1)
      .map(([t, c]) => c)
  )
}

function bezier3vec(t: number, [ p1, p2, p3, p4 ]: CubicBezier, f=bezier3) {
    return [
        f(t, p1[0], p2[0], p3[0], p4[0]),
        f(t, p1[1], p2[1], p3[1], p4[1])
    ]
}

function bezier3pvec(t: number, bezier: CubicBezier) {
    return bezier3vec(t, bezier, bezier3p)
}

function bezier3ppvec(t: number, bezier: CubicBezier) {
    return bezier3vec(t, bezier, bezier3pp)
}

function bezier3(t: number, w0: number, w1: number, w2: number, w3: number) {
    const t2 = t * t
    const t3 = t2 * t
    const mt = 1 - t
    const mt2 = mt * mt
    const mt3 = mt2 * mt

    return w0 * mt3 + 3 * w1 * mt2 * t + 3*w2*mt*t2 + w3*t3
}

function bezier3p(t: number, w0: number, w1: number, w2: number, w3: number) {
    const c1 = w3 - 3*w2 + 3*w1 - w0
    const t2 = t * t
    const c2 = 2*w2 - 4 * w1 + 2 * w0
    const c3 = w1 - w0

    return 3 * ( c1 * t2 + c2 * t + c3 )
}

function bezier3pp(t: number, w0: number, w1: number, w2: number, w3: number) {
    const c1 = w3 - 3*w2 + 3*w1 - w0
    const c2 = w2 - 2*w1 + w0

    return 6*( c1 * t + c2 )
}
