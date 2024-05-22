import { isBoolean, isPlainObject, cloneDeep, isString } from 'lodash-es';
import { compare } from 'compare-versions';
import { v4 as uuidv4 } from 'uuid';
import type {
  BrowserMatch,
  BrowserOption,
  CompatibilityOptions,
} from '../models/browser';

/**
 * 浏览器兼容性提示
 */
export class Compatibility {
  // 浏览器平台字段及对应名称
  readonly platformArr = [
    {
      field: 'ie',
      platform: 'IE',
    },
    {
      field: 'edge',
      platform: 'Edge',
    },
    {
      field: 'firefox',
      platform: 'Firefox',
    },
    {
      field: 'chrome',
      platform: 'Chrome',
    },
    {
      field: 'opera',
      platform: 'Opera',
    },
    {
      field: 'safari',
      platform: 'Safari',
    },
  ];

  // 浏览器匹配正则
  readonly regArr = [
    { label: 'ie', reg: [/rv:([\d.]+)\) like gecko/, /msie ([\d.]+)/] },
    { label: 'edge', reg: [/edge\/([\d.]+)/] },
    { label: 'firefox', reg: [/firefox\/([\d.]+)/] },
    { label: 'opera', reg: [/(?:opera|opr).([\d.]+)/] },
    { label: 'chrome', reg: [/chrome\/([\d.]+)/] },
    { label: 'safari', reg: [/version\/([\d.]+).*safari/] },
  ];

  // 浏览器下载地址映射
  readonly downloadLinkMap: Record<
    keyof Compatibility['minBrowserVersion'],
    string
  > = {
    edge: 'https://www.microsoft.com/zh-cn/edge',
    firefox: 'https://www.firefox.com.cn/',
    chrome: 'https://www.google.cn/chrome/',
    opera: 'https://www.opera.com/zh-cn',
    safari: 'https://www.apple.com/cn/safari/',
  };

  // 匹配到的浏览器平台及版本号
  browserMatch: BrowserMatch;
  // 限制浏览器最低版本
  minBrowserVersion: CompatibilityOptions['minBrowserVersion'];
  // 提示元素的id
  elemId: string | undefined;

  constructor(options: CompatibilityOptions) {
    this.browserMatch = this.getExplore();
    this.minBrowserVersion = this.assignDownloadLink(options.minBrowserVersion);
    if (!this.isSupport) {
      this.createElem();
    }
  }

  /**
   * 获取当前浏览器最低版本配置项
   */
  get minBrowserVersionItem(): BrowserOption | undefined {
    return this.minBrowserVersion[this.browserMatch.platform.toLowerCase()];
  }

  /**
   * 判断是否支持当前浏览器
   */
  get isSupport(): boolean {
    const { version } = this.browserMatch;
    if (isBoolean(this.minBrowserVersionItem))
      return this.minBrowserVersionItem;
    if (this.minBrowserVersionItem == null) return false;
    const result = compare(
      version,
      this.minBrowserVersionItem.minVersion,
      '>=',
    );
    return result;
  }

  /**
   * 获取浏览器平台及版本号
   */
  getExplore(): BrowserMatch {
    const Sys: Record<string, string> = {};
    const ua = navigator.userAgent.toLowerCase();
    for (let i = 0; i < this.regArr.length; i++) {
      const reg = this.regArr[i].reg;
      for (let j = 0; j < reg.length; j++) {
        const match = ua.match(reg[j]);
        if (match == null) {
          continue;
        }
        Sys[this.regArr[i].label] = match[1];
        break;
      }
    }
    for (const item of this.platformArr) {
      if (Sys[item.field]?.length > 0) {
        return {
          platform: item.platform,
          version: Sys[item.field],
        };
      }
    }
    return {
      platform: 'Unknow',
      version: '0',
    };
  }

  /**
   * 为各浏览器平台分配下载链接
   */
  assignDownloadLink(
    minBrowserVersion: CompatibilityOptions['minBrowserVersion'],
  ): CompatibilityOptions['minBrowserVersion'] {
    const newMinBrowserVersion = cloneDeep(minBrowserVersion);
    for (const key in newMinBrowserVersion) {
      const item = newMinBrowserVersion[key];
      if (this.isBrowserOption(item) && !isString(item.downloadLink)) {
        item.downloadLink = this.downloadLinkMap[key];
      }
    }
    return newMinBrowserVersion;
  }

  /**
   * 创建提示元素
   */
  createElem(): void {
    this.destroy();
    const linkStr = Object.keys(this.minBrowserVersion)
      .map((key) => {
        const platformItem = this.platformArr.find(
          (item) => item.field === key,
        );
        const minBrowserVersionItem = this.minBrowserVersion[key];
        const downloadLink = this.isBrowserOption(minBrowserVersionItem)
          ? minBrowserVersionItem.downloadLink
          : 'javascript: void(0)';
        return `<a href="${downloadLink}" target="_blank">${platformItem?.platform}</a>`;
      })
      .join('，');
    let innerHTML = `当前浏览器不支持，请使用 ${linkStr}`;
    if (this.isBrowserOption(this.minBrowserVersionItem)) {
      const item = this.minBrowserVersionItem;
      innerHTML = `当前浏览器版本过低，请使用 ${item.minVersion} 或以上版本`;
    }
    const elem = document.createElement('div');
    this.elemId = uuidv4();
    elem.id = this.elemId;
    elem.innerHTML = innerHTML;
    elem.style.position = 'fixed';
    elem.style.top = '0';
    elem.style.left = '0';
    elem.style.right = '0';
    elem.style.backgroundColor = '#ffffff';
    elem.style.color = '#000000';
    elem.style.padding = '10px';
    elem.style.fontSize = '12px';
    elem.style.zIndex = '9999';
    document.body.appendChild(elem);
  }

  /**
   * 销毁
   */
  destroy(): void {
    if (!isString(this.elemId)) return;
    const elem = document.getElementById(this.elemId);
    if (elem != null) {
      elem.remove();
      this.elemId = undefined;
    }
  }

  isBrowserOption(item: BrowserOption | undefined): item is BrowserOption {
    if (!isPlainObject(item)) {
      return true;
    }
    return false;
  }
}
