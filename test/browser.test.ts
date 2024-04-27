/**
 * @jest-environment jsdom
 */
import { Compatibility } from '../src/main';

describe('browser', () => {
  // 模拟当前浏览器版本
  const mockBrowser = (version: string) => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${version} Safari/537.36`,
    });
  };
  mockBrowser('124');

  test('compatibility', () => {
    const compatibility = new Compatibility({
      minBrowserVersion: { chrome: { minVersion: '124' } },
    });
    expect(compatibility.minBrowserVersionItem).toEqual({ minVersion: '124' });
  });
});
