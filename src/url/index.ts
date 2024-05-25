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

/**
 * 从content-disposition中获取文件ming
 */
export function getFilenameFromDisposition(
  contentDisposition: string,
): string | null {
  if (!isString(contentDisposition)) return null;

  // 尝试解析 `filename*`（使用RFC 5987编码）
  const filenameStarMatch = contentDisposition.match(/filename\*=[^;]+/);
  if (filenameStarMatch != null) {
    const filenameStar = filenameStarMatch[0];
    const parts = filenameStar.split("'");
    if (parts.length === 3) {
      return decodeURIComponent(parts[2]);
    }
  }

  // 尝试解析 `filename`
  const filenameMatch = contentDisposition.match(/filename="([^"]+)"/);
  if (filenameMatch != null) {
    return filenameMatch[1];
  }

  // 尝试解析未加引号的 `filename`
  const filenameMatchUnquoted = contentDisposition.match(/filename=([^;]+)/);
  if (filenameMatchUnquoted != null) {
    return filenameMatchUnquoted[1];
  }

  return null;
}
