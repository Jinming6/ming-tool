import { getRandomColor, getRandomHex, getRandomRgb } from '../src/main';
import { ColorType } from '../src/models/color';

describe('color', () => {
  test('获取随机rgb', () => {
    const rgb = getRandomRgb();
    expect(rgb.startsWith('rgb(')).toBe(true);
  });

  test('随机hex', () => {
    const hex = getRandomHex();
    expect(hex.startsWith('#')).toBe(true);
  });

  test('生成随机色值rgb', () => {
    const rgb = getRandomColor({ type: ColorType.RGB });
    expect(rgb.startsWith('rgb(')).toBe(true);
  });

  test('生成随机色值hex', () => {
    const hex = getRandomColor({ type: ColorType.HEX });
    expect(hex.startsWith('#')).toBe(true);
  });
});
