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

/**
 * 转换为webp格式
 */
export function convert2Webp(file: File, quality = 0.8): Promise<Blob> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('不是图片类型'));
      return;
    }
    if (file.type === 'image/webp') {
      resolve(file);
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx === null) {
        reject(new Error('无法获取canvas上下文'));
        URL.revokeObjectURL(url);
        return;
      }
      ctx.drawImage(img, 0, 0, img.width, img.height);
      canvas.toBlob(
        (blob) => {
          if (blob == null) {
            reject(new Error('无法获取blob对象'));
            URL.revokeObjectURL(url);
            return;
          }
          resolve(blob);
          URL.revokeObjectURL(url);
        },
        'image/webp',
        quality,
      );
    };
    img.onerror = (err) => {
      reject(err);
      URL.revokeObjectURL(url);
    };
  });
}

/**
 * 下载文件(根据url)
 */
export function downloadFile(url: string, filename: string): boolean {
  try {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    return true;
  } catch (e: any) {
    warn(`下载文件失败 ${e.message}`);
    return false;
  }
}
