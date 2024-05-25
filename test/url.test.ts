import { getFilenameFromUrl } from '../src/main';

describe('url', () => {
  test('从url中获取文件名', () => {
    const url = 'https://www.baidu.com/abc.jpg';
    expect(getFilenameFromUrl(url)).toBe('abc.jpg');
  });
});
