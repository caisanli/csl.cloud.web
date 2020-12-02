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

/**
 *
 * @export
 * @param {number} size
 * @returns {string}
 */
export function bytesToSize(size: number): string {
  if(size !== 0 && !size)
    return '';
  const units = ['B', 'KB', 'MB', 'TB', 'PB', 'TB']
  let index = 0;
  while(size >= 1024 && index < units.length) {
    index++;
    size = size / 1024;
  }
  size = Math.round(size * 100) / 100;
  return `${ size }${ units[index] }`;
}

/**
 *
 * @export
 * @param {string} ms
 * @returns {string}
 */
export function msToDate(ms: string): string {
	if(!ms) return '';
	let date = new Date(ms);
	let year = date.getFullYear();
	let mouth: string | number = date.getMonth() + 1;
	let day: string | number = date.getDate();
	let hour: string | number = date.getHours();
	let minute = date.getMinutes();
	let second = date.getSeconds();
	mouth = mouth < 10 ? '0' + mouth : mouth;
	day = day < 10 ? '0' + day : day;
	hour = hour < 10 ? '0' + hour : hour;
	return `${year}-${mouth}-${day} ${hour}:${minute}:${second}`;
}
