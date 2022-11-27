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

export function bezierPointsAntigrain(bezier: CubicBezier, scale = 1, depth=0): Point[] {
    if(depth >= 16) {
        return [ ]
    }

    const [
        [x1, y1],
        [x2, y2],
        [x3, y3],
        [x4, y4],
    ] = bezier

    const zerolen = 0.5 / scale

    const x12   = (x1 + x2) / 2;
    const y12   = (y1 + y2) / 2;
    const x23   = (x2 + x3) / 2;
    const y23   = (y2 + y3) / 2;
    const x34   = (x3 + x4) / 2;
    const y34   = (y3 + y4) / 2;
    const x123  = (x12 + x23) / 2;
    const y123  = (y12 + y23) / 2;
    const x234  = (x23 + x34) / 2;
    const y234  = (y23 + y34) / 2;
    const x1234 = (x123 + x234) / 2;
    const y1234 = (y123 + y234) / 2;

    const dx = x4-x1;
    const dy = y4-y1;

    const d2 = Math.abs(((x2 - x4) * dy - (y2 - y4) * dx));
    const d3 = Math.abs(((x3 - x4) * dy - (y3 - y4) * dx));

    if((d2 + d3)*(d2 + d3) < zerolen * zerolen * (dx*dx + dy*dy))
    {
        return [];
    }

    const [ left, right, mid ] = splitBezier(bezier, 0.5)

    return [
        ...bezierPointsAntigrain(left, scale, depth + 1),
        mid,
        ...bezierPointsAntigrain(right, scale, depth + 1)
    ]
}

export function bezierPointsT(bezier: CubicBezier, sw: number, scale = 1, cmaxima?: [number, number][], t0=0, t1=1, depth=0): [pt: Point, t: number][] {
     cmaxima ??= curvatureMaxima(bezier).map(t => ([
      t, beziercurvaturerad(t, bezier)
    ]))

    if(depth >= 16) return [ ]
    
    const lengthub = bezierlengthub(0, 1, bezier)
    const mincurvature = mincurvaturerad(cmaxima, t0, t1, bezier)

    const stroke_scalefac = 1 + (sw / mincurvature)
    const zerolen = 0.5 / (stroke_scalefac * scale)

    if(lengthub * lengthub < zerolen * zerolen + 2 * zerolen * mincurvature) return [ ]

    const t = 0.5

    const [ left, right, mid ] = splitBezier(bezier, t)

    return [
        ...bezierPointsT(left, sw, scale, cmaxima, t0, (t0+t1)/2, depth + 1),
        [mid, (t0+t1)/2],
        ...bezierPointsT(right, sw, scale, cmaxima, (t0+t1)/2, t1, depth + 1)
    ]
}

function splitBezier([p1, p2, p3, p4]: CubicBezier, t: number): [CubicBezier, CubicBezier, Point] {
    const pt1_1 = lerp(p1, p2, t)
    const pt1_2 = lerp(p2, p3, t)
    const pt1_3 = lerp(p3, p4, t)

    const pt2_1 = lerp(pt1_1, pt1_2, t)
    const pt2_2 = lerp(pt1_2, pt1_3, t)

    const pt3 = lerp(pt2_1, pt2_2, t)

    return [
        [ p1, pt1_1, pt2_1, pt3 ],
        [ pt3, pt2_2, pt1_3, p4 ],
        pt3
    ]
}

function lerp(p1: Point, p2: Point, fac: number): Point {
    return [
        p1[0] + (fac)*(p2[0]-p1[0]),
        p1[1] + (fac)*(p2[1]-p1[1]),
    ]
}

function add([x1, y1]: Point, [x2, y2]: Point): Point {
    return [x1 + y1, x2 + y2]
}

function sub([x1, y1]: Point, [x2, y2]: Point): Point {
    return [x1 - y1, x2 - y2]
}

function dot([x1, y1]: Point, [x2, y2]: Point): number {
    return x1 * y1 + x2 * y2
}

function perp([x, y]: Point): Point {
    return [-y, x]
}

function len2([x, y]: Point): number {
    return x * x + y * y
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
      .map(([, c]) => c)
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
