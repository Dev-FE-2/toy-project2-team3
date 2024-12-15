const NESTED_PATHS = {
  index: {
    text: 'index',
    pathName: '',
    link: '/',
  },
  intro: {
    text: 'intro',
    pathName: 'intro',
    link: '/intro/',
  },
  admin: {
    text: 'admin',
    pathName: 'admin',
    link: '/admin/',
  },
};

const URL = {
  userHome: {
    text: 'HOME',
    pathName: 'userHome',
    link: '/userHome',
  },
  editProfile: {
    text: '나의 정보',
    pathName: 'editProfile',
    link: '/editProfile',
  },
  schedule: {
    text: '나의 업무',
    pathName: 'schedule',
    link: '/schedule',
  },
  attendance: {
    text: '나의 근태',
    pathName: 'attendance',
    link: '/attendance',
  },
  salary: {
    text: '나의 급여',
    pathName: 'salary',
    link: '/salary',
  },
  salaryDetails: {
    text: '급여 내역',
    pathName: 'salaryDetails',
    link: '/salaryDetails',
  },
  salaryCorrection: {
    text: '급여 정정 신청',
    pathName: 'salaryCorrection',
    link: '/salaryCorrection',
  },
  login: {
    text: '로그인',
    pathName: 'login',
    link: '/login',
  },
  signup: {
    text: '회원가입',
    pathName: 'signup',
    link: '/signup',
  },
  employeeList: {
    text: '직원 관리',
    pathName: 'employeeList',
    link: `/${NESTED_PATHS.admin.pathName}/employeeList`,
  },
  salaryRequest: {
    text: '급여 정정 신청',
    pathName: 'salaryRequest',
    link: `/${NESTED_PATHS.admin.pathName}/salaryRequest`,
  },
};

export { NESTED_PATHS, URL };
