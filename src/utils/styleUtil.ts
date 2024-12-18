/** style에 관련된 유틸함수 */

/**
 * hexToRgba - 디자인 토큰에 정의된 색상 hex 코드를 투명도 처리가 가능한 rgba 코드로 변한 합니다.
 *
 * @param {string} hex   // hex code (16진수)
 * @param {number} alpha // 투명도 (0 ~ 1 사이 소수)
 * @returns {string} // rgba code (10진수)
 */

export const hexToRgba = (hex: string, alpha: number): string => {
  const convertDecimalNumber = (startIndex: number, endIndex: number) =>
    parseInt(hex.slice(startIndex, endIndex), 16);

  const red = convertDecimalNumber(1, 3);
  const green = convertDecimalNumber(3, 5);
  const blue = convertDecimalNumber(5, 7);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};
