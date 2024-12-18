export type Setter<T> = React.SetStateAction<T>

export function getNewValue<T>(setter: Setter<T>, prev: T): T {
  if (typeof setter !== "function") {
    return setter
  }
  return (setter as (old: T) => T)(prev)
}