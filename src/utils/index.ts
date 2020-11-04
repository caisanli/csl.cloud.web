/**
 * 获取相对位置
 * @param elem
 */
export function getOffset(elem: HTMLElement): { left: number; top: number } {
  let top = elem.offsetTop,
    left = elem.offsetLeft;
  let parent = elem.offsetParent as HTMLElement;
  while (parent) {
    top += parent.offsetTop;
    left += parent.offsetLeft;
    parent = parent.offsetParent as HTMLElement;
  }
  return { top, left };
}
