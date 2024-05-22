export interface BrowserOption {
  // 最低版本
  minVersion: string;
  // 下载地址
  downloadLink?: string;
}

// 兼容性配置参数
export interface CompatibilityOptions {
  minBrowserVersion: Partial<{
    edge: BrowserOption;
    firefox: BrowserOption;
    chrome: BrowserOption;
    opera: BrowserOption;
    safari: BrowserOption;
    [platform: string]: BrowserOption;
  }>;
}

// 匹配到的浏览器平台及版本号
export interface BrowserMatch {
  platform: string;
  version: string;
}
