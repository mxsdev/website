export type PolyPoint = [number, number]
export type PolyPoints = PolyPoint[]

type PointTransformer = (point: PolyPoint) => PolyPoint

export const renderPoints = (points: PolyPoints) =>
  points.map((p) => p.join(",")).join(" ")
export const assignPoints = (
  root: SVGSVGElement,
  svg_points: SVGPointList,
  points: PolyPoints
) => {
  svg_points.clear()

  for (const [x, y] of points) {
    const point = root.createSVGPoint()

    point.x = x
    point.y = y

    svg_points.appendItem(point)
  }
}

export const translate =
  (x: number, y: number) =>
  ([a, b]: PolyPoint): PolyPoint =>
    [a + x, b + y]
export const translateX = (x: number) => translate(x, 0)
export const translateY = (y: number) => translate(0, y)

export const applyToPoints = (
  points: PolyPoints,
  transformer: PointTransformer
) => points.map(transformer)

export const equilateralTriangleCenter = (
  center: PolyPoint,
  height: number
): PolyPoints => {
  const s = (2 / Math.sqrt(3)) * Math.abs(height)

  return [
    translateX(-s / 2)(center),
    translateX(s / 2)(center),
    translateY(height)(center),
  ]
}

const toDict = ([x, y]: PolyPoint): { x: number; y: number } => ({ x, y })
const fromDict = ({ x, y }: { x: number; y: number }): PolyPoint => [x, y]
