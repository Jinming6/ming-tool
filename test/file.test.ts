/**
 * @jest-environment jsdom
 */

import { downloadArrayBuffer, downloadFile } from '../src/file';

describe('file', () => {
  if (typeof window.URL.createObjectURL === 'undefined') {
    window.URL.createObjectURL = (() => {}) as any;
  }
  if (typeof window.URL.revokeObjectURL === 'undefined') {
    window.URL.revokeObjectURL = (() => {}) as any;
  }

  test('下载ArrayBuffer', () => {
    const arrayBuffer = new ArrayBuffer(8);
    const filename = 'test.txt';
    const result = downloadArrayBuffer(arrayBuffer, filename);
    expect(result).toBe(true);
  });
  test('下载文件(根据url)', () => {
    const url =
      'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png';
    const filename = 'test.png';
    const result = downloadFile(url, filename);
    expect(result).toBe(true);
  });
});
