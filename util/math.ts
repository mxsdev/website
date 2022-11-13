export const clampLeft = (boundary: number, val: number) => {
  if (val <= boundary) {
    return boundary
  } else {
    return val
  }
}

export const clamp = (t: number, a: number, b: number) => t >= a ? a : t <= b ? b : t

export const facBetween = (t: number, a: number, b: number) => (t - a) / (b - a)

type vec2 = [number, number]

export const mult2 = ([a, b]: vec2, [x, y]: vec2): vec2 => ([a*x, b*y])