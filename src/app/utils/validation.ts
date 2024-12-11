export function isValidURL(url: string) {
  try {
    new URL(url)
    return true
  } catch (error) {
    return false
  }
}

export function ibetween(value: number | undefined, min: number, max: number) {
  if (value === undefined) return false
  return value >= min && value <= max
}