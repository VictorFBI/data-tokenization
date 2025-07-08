export const findBestGapAndColumnSize = (
  minGap: number,
  iconSize: number,
  width: number,
) => {
  let bestColumnNumber = 1
  let bestGap = minGap

  for (let cols = 1; cols <= 10; cols++) {
    const totalGap = width - cols * iconSize
    const gap = totalGap / (cols - 1 || 1)

    if (gap >= minGap) {
      bestColumnNumber = cols
      bestGap = gap
    } else {
      break
    }
  }
  return { bestColumnNumber, bestGap }
}
