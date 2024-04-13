/**
 * @jest-environment jsdom
 */

import { downloadArrayBuffer } from '../src/file';

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
});
