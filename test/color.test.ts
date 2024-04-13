import { getRandomHex, getRandomRgb } from '../src/color';

describe('color', () => {
  test('获取随机rgb', () => {
    const rgb = getRandomRgb();
    expect(rgb.startsWith('rgb(')).toBe(true);
  });

  test('随机hex', () => {
    const hex = getRandomHex();
    expect(hex.startsWith('#')).toBe(true);
  });
});
