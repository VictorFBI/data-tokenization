import { parseToRgb } from 'polished'

export const hexToRgba = (hex: string, alpha: number) => {
  const { red, green, blue } = parseToRgb(hex)
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}