type Url = {
  [key: string]: {
    text: string;
    name: string;
    link: string;
  };
};

const NESTED_PATHS: Url = {
  index: {
    text: 'index',
    name: '',
    link: '/',
  },
  intro: {
    text: 'intro',
    name: 'intro',
    link: '/intro/',
  },
  admin: {
    text: 'admin',
    name: 'admin',
    link: '/admin/',
  },
};

const URL: Url = {
  index: {
    text: 'index',
    name: '',
    link: '/',
  },
  userHome: {
    text: 'HOME',
    name: 'userHome',
    link: '/userHome',
  },
  profile: {
    text: '나의 정보',
    name: 'profile',
    link: '/profile',
  },
  schedule: {
    text: '나의 업무',
    name: 'schedule',
    link: '/schedule',
  },
  attendance: {
    text: '나의 근태',
    name: 'attendance',
    link: '/attendance',
  },
  salary: {
    text: '나의 급여',
    name: 'salary',
    link: '/salary',
  },
  salaryDetails: {
    text: '급여 내역',
    name: 'salaryDetails',
    link: '/salaryDetails',
  },
  salaryCorrection: {
    text: '급여 정정 신청',
    name: 'salaryCorrection',
    link: '/salaryCorrection',
  },
  login: {
    text: '로그인',
    name: 'login',
    link: '/login',
  },
  signup: {
    text: '회원가입',
    name: 'signup',
    link: '/signup',
  },
  employeeList: {
    text: '직원 관리',
    name: 'employeeList',
    link: `/${NESTED_PATHS.admin.name}/employeeList`,
  },
  salaryRequest: {
    text: '급여 정정 신청',
    name: 'salaryRequest',
    link: `/${NESTED_PATHS.admin.name}/salaryRequest`,
  },
};

export { NESTED_PATHS, URL };
