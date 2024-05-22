import { type GetRandomColorOptions, ColorType } from '../models/color';

/**
 * 随机rgb
 * @deprecated
 */
export const getRandomRgb = (): string => {
  const random = (): number => {
    return Math.floor(Math.random() * 256);
  };
  return `rgb(${random()}, ${random()}, ${random()})`;
};

/**
 * 随机hex
 * @deprecated
 */
export const getRandomHex = (): string => {
  const random = (): string => {
    return Math.floor(Math.random() * 256).toString(16);
  };
  return `#${random()}${random()}${random()}`;
};

/**
 * 生成随机色值
 */
export const getRandomColor = (options: GetRandomColorOptions): string => {
  const { type, lightColor } = options;
  const minNum = lightColor ?? false ? 256 : 201;

  const random = (): number => {
    return Math.floor(Math.random() * minNum);
  };
  if (type === ColorType.RGB) {
    return `rgb(${random()}, ${random()}, ${random()})`;
  }

  const randomHex = (): string => {
    return random().toString(16);
  };
  return `#${randomHex()}${randomHex()}${randomHex()}`;
};
