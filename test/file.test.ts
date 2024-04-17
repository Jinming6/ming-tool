/**
 * @jest-environment jsdom
 */

import { downloadArrayBuffer, downloadFile } from '../src/file';
import { jest } from '@jest/globals';

describe('file', () => {
  window.URL.createObjectURL = jest.fn(() => 'Hello, world!');
  window.URL.revokeObjectURL = jest.fn();
  window.Image = jest.fn() as any;

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
