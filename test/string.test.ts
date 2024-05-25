import { DefaultReplaceStr, replaceEmpty } from '../src/main';

describe('string', () => {
  test('空值替换', () => {
    const arr = [null, undefined, ''];
    arr.forEach((item) => {
      expect(replaceEmpty(item)).toBe(DefaultReplaceStr);
    });
  });
});
