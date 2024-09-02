import { DefaultReplaceStr, replaceEmpty } from '../src/main';

describe('string', () => {
  test('空值替换_遍历', () => {
    const arr = [null, undefined, ''];
    arr.forEach((item) => {
      expect(replaceEmpty(item)).toBe(DefaultReplaceStr);
    });
  });

  test('空值替换_单个', () => {
    expect(replaceEmpty()).toBe(DefaultReplaceStr);
  });
});
