import { isString } from 'lodash-es';
import { warn } from '../utils/warning';

/**
 * 从url中获取文件名
 */
export function getFilenameFromUrl(url: string): string {
  if (!isString(url) || url === '') {
    warn('url为空');
    return '';
  }
  const arr = url.split('/');
  return arr[arr.length - 1];
}
