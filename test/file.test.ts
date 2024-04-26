/**
 * @jest-environment jsdom
 */

import { downloadArrayBuffer, downloadFile, downloadUrl } from '../src/file';
import { jest } from '@jest/globals';
import { InputType } from '../src/file/type';

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
  test('下载url', () => {
    const url = 'https://s2.loli.net/2024/04/26/z9NEnaI7lJqwrx5.png';
    const filename = 'test.png';
    const result = downloadUrl(url, filename);
    expect(result).toBe(true);
  });
  test('下载文件(传入url)', () => {
    const url = 'https://s2.loli.net/2024/04/26/z9NEnaI7lJqwrx5.png';
    const filename = 'test.png';
    const result = downloadFile({
      inputType: InputType.URL,
      url,
      filename,
    });
    expect(result).toBe(true);
  });
  test('下载文件(传入arrayBuffer)', () => {
    const arrayBuffer = new ArrayBuffer(8);
    const filename = 'test.txt';
    const result = downloadFile({
      inputType: InputType.ArrayBuffer,
      arrayBuffer,
      filename,
    });
    expect(result).toBe(true);
  });
});
