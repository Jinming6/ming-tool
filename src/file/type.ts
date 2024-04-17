/**
 * 输入的类型
 */
export enum InputType {
  ArrayBuffer = 'arrayBuffer',
  URL = 'url',
}

/**
 * 下载文件配置
 */
export interface DownloadFileOpts {
  inputType: InputType;
  filename: string;
  url?: string;
  arrayBuffer?: ArrayBuffer;
}
