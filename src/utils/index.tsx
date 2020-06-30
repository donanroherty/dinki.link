export const mapToRange = (
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
  val: number
) => {
  const inRange = inMax - inMin
  const inAlpha = (val - inMin) / inRange
  const outRange = outMax - outMin
  return outMin + outRange * inAlpha
}
