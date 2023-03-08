/**
 * Check if the given value is the type of array.
 */
export function isArray(value: any): value is any[] {
  return Array.isArray(value)
}
