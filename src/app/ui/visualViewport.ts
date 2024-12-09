import { useEffect } from "react";

export function useVisualViewportHeight(onResize: (height: number) => void) {

  useEffect(() => {
    const callback = function (this: VisualViewport, ev: Event) {
      onResize(this.height)
    }

    if (typeof window === "undefined") return
    if (!window.visualViewport) return
    window.visualViewport.addEventListener('resize', callback)
    return () => {
      if (typeof window === "undefined") return
      if (!window.visualViewport) return
      window.visualViewport.removeEventListener('resize', callback)
    }
  }, [onResize])
}