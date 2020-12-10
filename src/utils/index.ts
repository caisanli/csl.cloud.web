import { IUser } from '@/types';

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
  if (size !== 0 && !size) return '';
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'TB'];
  let index = 0;
  while (size >= 1024 && index < units.length) {
    index++;
    size = size / 1024;
  }
  size = Math.round(size * 100) / 100;
  return `${size}${units[index]}`;
}

/**
 *
 * @export
 * @param {string} ms
 * @returns {string}
 */
export function msToDate(ms: string): string {
  if (!ms) return '';
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

/**
 * 生成UUID
 * @export
 * @returns {string}
 */
export function uuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * 返回用户信息
 * @export
 * @param {string} [key]
 * @returns {(string | number | IUser)}
 */
export function getUserValue(key?: string): string | number | IUser {
  let localUserStr: string = localStorage.getItem('user') || '{}';
  let localUser: any = JSON.parse(localUserStr);
  return key ? localUser[key] : localUser;
}

/**
 * 下载文件
 * @export
 * @param {Blob} blob
 * @param {string} name
 */
export function download(blob: Blob, name: string): void {
  blob = new Blob([blob]);
  if ('download' in document.createElement('a')) {
    // 非IE下载
    const link = document.createElement('a');
    link.download = name;
    link.style.display = 'none';
    link.href = URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(link.href); // 释放URL 对象
    document.body.removeChild(link);
  } else {
    // IE10+下载
    navigator.msSaveBlob(blob, name);
  }
}
