import { useEffect, useState } from "react";

export function useMounted(onMounted?: () => void, onRendered?: () => void) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
    onMounted?.()
  }, [onMounted])
  useEffect(() => {
    if (!mounted) return
    onRendered?.()
  }, [mounted, onRendered])
  return mounted
}
