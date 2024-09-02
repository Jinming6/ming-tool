export const DefaultReplaceStr = '--';

/**
 * 空值替换
 */
export function replaceEmpty(
  str?: unknown,
  replaceStr: string = DefaultReplaceStr,
): unknown {
  if (str === null || str === undefined || str === '') {
    return replaceStr;
  }
  return str;
}
