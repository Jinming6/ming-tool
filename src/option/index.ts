import { cloneDeep, isArray, isPlainObject } from 'lodash-es';
import type { LabelMap, Options, DataSourceItem, FieldsName } from './type';

export const DefaultFieldsName: FieldsName = { label: 'label', value: 'value' };

export class Option {
  /**
   * 下拉选项
   */
  dataSource: DataSourceItem[] = [];
  /**
   * 字段名
   */
  fieldsName: FieldsName = DefaultFieldsName;

  constructor(options: Options) {
    this.init(options);
  }

  /**
   * 获取下拉选项
   */
  get options(): DataSourceItem[] {
    return this.dataSource;
  }

  /**
   * 获取label映射
   */
  get labelMap(): LabelMap {
    const map: Record<DataSourceItem['value'], DataSourceItem['label']> = {};
    this.dataSource.forEach((item) => {
      if (this.fieldsName.value in item && this.fieldsName.label in item) {
        const key = item[this.fieldsName.value as keyof typeof item];
        const value = item[
          this.fieldsName.label as keyof typeof item
        ] as DataSourceItem['label'];
        map[key] = value;
      }
    });
    return map;
  }

  /**
   * 初始化
   */
  init(options: Options): void {
    const { dataSource, fieldsName } = options;
    if (isArray(dataSource)) {
      this.dataSource = cloneDeep(dataSource);
    }
    if (isPlainObject(fieldsName)) {
      this.fieldsName = fieldsName as FieldsName;
    }
  }

  /**
   * 更新
   */
  update(options: Options): void {
    this.init(options);
  }
}
