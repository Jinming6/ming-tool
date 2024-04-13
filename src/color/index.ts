/**
 * 随机rgb
 */
export const getRandomRgb = (): string => {
  const random = (): number => {
    return Math.floor(Math.random() * 256);
  };
  return `rgb(${random()}, ${random()}, ${random()})`;
};

/**
 * 随机hex
 */
export const getRandomHex = (): string => {
  const random = (): string => {
    return Math.floor(Math.random() * 256).toString(16);
  };
  return `#${random()}${random()}${random()}`;
};
