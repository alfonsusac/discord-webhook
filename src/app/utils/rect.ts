export function isPointerEventInsideRect(
  rect: DOMRect,
  point: Pick<MouseEvent, "clientX" | "clientY">
) {
  return (point.clientX >= rect.left &&
    point.clientX <= rect.right &&
    point.clientY >= rect.top &&
    point.clientY <= rect.bottom);
}