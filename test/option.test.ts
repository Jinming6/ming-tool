import { Option } from '../src/main';

describe('option', () => {
  const dataSource = [
    {
      label: '关闭',
      value: 0,
    },
    {
      label: '开启',
      value: 1,
    },
    {
      label: '暂停',
      value: 2,
    },
  ];

  const option = new Option({
    dataSource,
  });

  test('下拉选项', () => {
    expect(JSON.stringify(dataSource) === JSON.stringify(option.options)).toBe(
      true,
    );
  });

  test('value映射为label', () => {
    const labelKeys = dataSource.map((item) => item.value);
    for (const key in option.labelMap) {
      expect(labelKeys.includes(Number(key))).toBe(true);
    }
  });
});
