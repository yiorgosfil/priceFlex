// compact format: e.g. 1.2K instead of 1200
const compactNumberFormatter = new Intl.NumberFormat(undefined, { notation: 'compact' })

export function formatCompactNumber(number: number) {
  return compactNumberFormatter.format(number)
}
