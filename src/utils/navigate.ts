import { URL } from '../constant';

/** Path, Route, Navagate에 관련된 유틸함수 */

/**
 * getPageTitle - path 문자열을 인자로 넘기고 해당 경로의 페이지 타이틀을 반환 합니다.
 *
 * @param {string} path useLocation().pathname, widdow.location.pathname 반환 값과 같은 경로 ex) /admin/salaryRequest
 * @returns {string}
 */
export const getPageTitle = (path: string): string => {
  for (const key in URL) {
    const urlInfo = URL[key];

    if (urlInfo.link == path) return urlInfo.text;
  }

  return '';
};
