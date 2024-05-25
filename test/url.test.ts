import { getFilenameFromDisposition, getFilenameFromUrl } from '../src/main';

describe('url', () => {
  test('从url中获取文件名', () => {
    const url = 'https://www.baidu.com/abc.jpg';
    expect(getFilenameFromUrl(url)).toBe('abc.jpg');
  });

  it('应该去除Content-Disposition返回文件名的引号', () => {
    const contentDisposition = 'attachment; filename="example.txt"';
    const filename = getFilenameFromDisposition(contentDisposition);
    expect(filename).toBe('example.txt');
  });

  it('应该从Content-Disposition返回未加引号的文件名', () => {
    const contentDisposition = 'attachment; filename=example.txt';
    const filename = getFilenameFromDisposition(contentDisposition);
    expect(filename).toBe('example.txt');
  });

  it('应该从Content-Disposition返回带有编码filename*的文件名', () => {
    const contentDisposition =
      "attachment; filename*=UTF-8''%e4%b8%ad%e6%96%87.txt";
    const filename = getFilenameFromDisposition(contentDisposition);
    expect(filename).toBe('中文.txt');
  });

  it('如果Content-Disposition不包含filename，则返回null', () => {
    const contentDisposition = 'attachment';
    const filename = getFilenameFromDisposition(contentDisposition);
    expect(filename).toBeNull();
  });

  it('如果Content-Disposition为空，应该返回null', () => {
    const contentDisposition = '';
    const filename = getFilenameFromDisposition(contentDisposition);
    expect(filename).toBeNull();
  });

  it('如果Content-Disposition没有定义，应该返回null吗', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const filename = getFilenameFromDisposition(null as any);
    expect(filename).toBeNull();
  });
});
