import { cn } from "lazy-cn"
import { useEffect, useRef, type ComponentPropsWithoutRef } from "react"

export function ResizeAnimation(
  { children, className, dependency, ...props }: ComponentPropsWithoutRef<"div"> & {
    dependency: any[],
  }
) {
  const ref = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ref.current!.classList.add("transition-all")
  }, [dependency])

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (!ref.current) return
        ref.current.style.height = `${ entry.contentRect.height }px`
      }
    });
    resizeObserver.observe(innerRef.current!);
    return () => {
      resizeObserver.disconnect();
    }
  }, [])

  return (
    <div className={cn("relative transition-all", className)}
      ref={ref}
      onTransitionEnd={() => {
        ref.current!.classList.remove("transition-all")
      }}>
      <div className="absolute left-0 top-0 right-0" ref={innerRef}>
        {children}
      </div>
    </div>
  )
}
