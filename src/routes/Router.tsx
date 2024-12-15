import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { default as ProtectedRoute } from './ProtectedRoute';
import { Layout } from '../components';
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
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Layout 중첩 라우팅 */}

          {/* 기본 경로는 로그인 페이지로 리다이렉트 */}
          <Route index element={<Navigate to="/userHome" replace />} />

          {/* user */}
          <Route
            path="userHome"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <UserHome />
              </ProtectedRoute>
            }
          />
          {/* 유저 메인 페이지 */}
          <Route
            path="schedule"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Schedule />
              </ProtectedRoute>
            }
          />
          {/* 업무 일정 페이지 */}
          <Route
            path="editProfile"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <EditProfile />
              </ProtectedRoute>
            }
          />
          {/* 회원 정보 페이지 */}
          <Route
            path="attendance"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Attendance />
              </ProtectedRoute>
            }
          />
          {/* 근태 관리 페이지 */}
          <Route
            path="salaryCorrection"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SalaryCorrection />
              </ProtectedRoute>
            }
          />
          {/* 급여 정정 신청 페이지 */}
          <Route
            path="salaryDetails"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SalaryDetails />
              </ProtectedRoute>
            }
          />
          {/* 급여 내역 페이지 */}
        </Route>

        {/* Intro */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/**!SECTION
         * @TODO /intro/ 중첩 element로 IntroLayout 컴포넌트로 리팩토링 
         * 
          <Route path="/login" element={<Navigate to="/intro/login" replace />} />
          <Route path="/signup" element={<Navigate to="/intro/login" replace />} />
          <Route path="/intro/" element={<IntroLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
         */}

        <Route path="admin" element>
          {/* 관리자 직원 목록 */}
          <Route path="employeeList" element={<EmployeeList />} />
          {/* 급여 정정 요청 페이지 */}
          <Route path="salaryRequest" element={<SalaryRequest />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
