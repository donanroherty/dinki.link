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

export const rgbToHex = (rgb: any) => {
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
  const hex = (x: string) => ("0" + parseInt(x).toString(16)).slice(-2)
  return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3])
}
