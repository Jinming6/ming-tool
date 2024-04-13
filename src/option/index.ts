import { isPlainObject } from 'lodash-es';
import type { LabelMap, Options, DataSourceItem, FieldsName } from './type';

export const DefaultFieldsName: FieldsName = { label: 'label', value: 'value' };

export class Option {
  /**
   * @description: 下拉选项
   */
  dataSource: DataSourceItem[];
  /**
   * @description: 字段名
   */
  fieldsName: FieldsName;

  constructor(options: Options) {
    const { dataSource, fieldsName = DefaultFieldsName } = options;
    this.dataSource = dataSource;
    this.fieldsName = isPlainObject(fieldsName)
      ? fieldsName
      : DefaultFieldsName;
  }

  /**
   * @description: 获取下拉选项
   */
  get options(): DataSourceItem[] {
    return this.dataSource;
  }

  /**
   * @description: 获取label映射
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
}
