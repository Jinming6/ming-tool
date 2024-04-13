import { warn } from '../utils/warning';

/**
 * 下载文件流
 */
export function downloadArrayBuffer(
  stream: ArrayBuffer,
  filename: string,
): boolean {
  try {
    const blob = new Blob([stream], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    return true;
  } catch (e: any) {
    warn(`下载文件流失败 ${e.message}`);
    return false;
  }
}
