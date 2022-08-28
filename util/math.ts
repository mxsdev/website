export const clampLeft = (boundary: number, val: number) => {
  if (val <= boundary) {
    return boundary
  } else {
    return val
  }
}
