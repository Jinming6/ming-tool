export interface DataSourceItem {
  label: string;
  value: string | number;
}

export interface FieldsName {
  label: string;
  value: string;
}

export interface Options {
  dataSource: DataSourceItem[];
  fieldsName?: FieldsName;
}

export type LabelMap = Record<DataSourceItem['value'], DataSourceItem['label']>;
