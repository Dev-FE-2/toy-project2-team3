import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { default as SideBar } from '../components/layout/SideBar';
import {
  UserHome,
  Login,
  SignUp,
  Schedule,
  EditProfile,
  Attendance,
  EmployeeList,
  SalaryRequest,
  SalaryDetails,
  SalaryCorrection,
} from '../pages';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SideBar />}>
          {' '}
          {/* 사이드 바 중첩 라우팅 */}
          <Route index element={<Navigate to="/login" replace />} />{' '}
          {/* 기본 경로는 로그인 페이지로 리다이렉트 */}
          {/* user */}
          <Route path="userHome" element={<UserHome />} />{' '}
          {/* 유저 메인 페이지 */}
          <Route path="schedule" element={<Schedule />} />{' '}
          {/* 업무 일정 페이지 */}
          <Route path="editProfile" element={<EditProfile />} />{' '}
          {/* 회원 정보 페이지 */}
          <Route path="attendance" element={<Attendance />} />{' '}
          {/* 근태 관리 페이지 */}
          <Route path="salaryCorrection" element={<SalaryCorrection />} />{' '}
          {/* 급여 정정 신청 페이지 */}
          <Route path="salaryDetails" element={<SalaryDetails />} />{' '}
          {/* 급여 내역 페이지 */}
          {/* admin */}
          <Route path="employeeList" element={<EmployeeList />} />{' '}
          {/* 관리자 직원 목록 */}
          <Route path="salaryRequest" element={<SalaryRequest />} />{' '}
          {/* 급여 정정 요청 페이지 */}
        </Route>
        {/* common */}
        <Route path="/login" element={<Login />} /> {/* 로그인 페이지 */}
        <Route path="/signUp" element={<SignUp />} /> {/* 회원가입 페이지 */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
