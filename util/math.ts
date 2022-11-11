export const clampLeft = (boundary: number, val: number) => {
  if (val <= boundary) {
    return boundary
  } else {
    return val
  }
}

export const clamp = (t: number, a: number, b: number) => t >= a ? a : t <= b ? b : t