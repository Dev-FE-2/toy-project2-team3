import { URL } from '../constant';
import { NavItem } from '../types';

const NAV_ITEM: NavItem[] = [
  // {
  //   ...URL.userHome,
  //   hasSubNav: false,
  //   firstSubNav: '',
  //   isSubNav: false,
  //   parentNav: '',
  //   icon: 'home',
  // },
  // {
  //   ...URL.profile,
  //   hasSubNav: false,
  //   firstSubNav: '',
  //   isSubNav: false,
  //   parentNav: '',
  //   icon: 'person',
  // },
  {
    ...URL.schedule,
    hasSubNav: false,
    firstSubNav: '',
    isSubNav: false,
    parentNav: '',
    icon: 'calendar_today',
    iconSize: 22,
  },
  {
    ...URL.salary,
    hasSubNav: true,
    firstSubNav: `${URL.salaryDetails.link}`,
    isSubNav: false,
    parentNav: '',
    icon: 'attach_money',
  },
  {
    ...URL.salaryDetails,
    hasSubNav: false,
    firstSubNav: '',
    isSubNav: true,
    parentNav: `${URL.salary.link}`,
    icon: '',
  },
  {
    ...URL.salaryCorrection,
    hasSubNav: false,
    firstSubNav: '',
    isSubNav: true,
    parentNav: `${URL.salary.link}`,
    icon: '',
  },
];

export { NAV_ITEM };
