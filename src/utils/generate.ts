/**
 * generateEmployeeId - 현재 날짜와 시간을 기반으로 8자리 사번을 생성합니다.
 *
 * @returns {string} 8자리로 구성된 사번 (형식: YYMMDDHH)
 * - YY: 연도 마지막 두 자리
 * - MM: 월 (2자리, 01~12)
 * - DD: 일 (2자리, 01~31)
 * - HH: 시간 (2자리, 00~23)
 */
export const generateEmployeeId = (): string => {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 월 (1월이 0부터 시작하므로 +1)
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');

  return `${year}${month}${day}${hour}`;
};
