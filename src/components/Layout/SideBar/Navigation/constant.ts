import { URL } from '../../../../constant';

const { schedule, salary } = URL;

const ITEMS_DATA = [
  /**TODO - 메인페이지 구현 후 사용
   *
   * { id: 0, icon: 'home', text: 'HOME', link: userHome.link },
   */
  // {
  //   id: 1,
  //   icon: 'account_circle',
  //   text: editProfile.text,
  //   link: editProfile.link,
  // },
  { id: 2, icon: 'calendar_month', text: schedule.text, link: schedule.link },
  // { id: 3, icon: 'schedule', text: attendance.text, link: attendance.link },
  { id: 4, icon: 'paid', text: salary.text, hasSubItems: true },
];

export { ITEMS_DATA };
