import { URL } from '../../../../constant';

const { userHome, editProfile, schedule, attendance, salary } = URL;

const ITEMS_DATA = [
  { id: 0, icon: 'home', text: 'HOME', link: userHome.link },
  {
    id: 1,
    icon: 'account_circle',
    text: editProfile.text,
    link: editProfile.link,
  },
  { id: 2, icon: 'calendar_month', text: schedule.text, link: schedule.link },
  { id: 3, icon: 'schedule', text: attendance.text, link: attendance.link },
  { id: 4, icon: 'paid', text: salary.text, hasSubItems: true },
];

export { ITEMS_DATA };
