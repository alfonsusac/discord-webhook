import { useEffect, useState } from "react";

export function useMounted(onMounted?: () => void) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
    onMounted?.()
  }, [])
  return mounted
}