import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../state/store';
import { URL, NESTED_PATHS } from '../constant';
import { default as ProtectedRoute } from './ProtectedRoute';
import { Layout } from '../components';
import {
  UserHomePage,
  LoginPage,
  SignUpPage,
  SchedulePage,
  ProfilePage,
  AttendancePage,
  EmployeeListPage,
  SalaryRequestPage,
  SalaryDetailsPage,
  SalaryCorrectionPage,
} from '../pages';

function Router() {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Layout 중첩 라우팅 */}

          {/* 기본 경로 리다이렉트 설정 */}
          <Route index element={<Navigate to={URL.userHome.link} replace />} />

          {/* user */}

          {/* 유저 메인 페이지 */}
          <Route
            path={URL.userHome.name}
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <UserHomePage />
              </ProtectedRoute>
            }
          />
          {/* 회원 정보 페이지 */}
          <Route
            path={URL.profile.name}
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          {/* 업무 일정 페이지 */}
          <Route
            path={URL.schedule.name}
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SchedulePage />
              </ProtectedRoute>
            }
          />
          {/* 근태 관리 페이지 */}
          <Route
            path={URL.attendance.name}
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <AttendancePage />
              </ProtectedRoute>
            }
          />
          {/* 나의 급여 페이지 */}
          <Route
            path={URL.salary.name}
            element={<Navigate to={URL.salaryDetails.link} replace />}
          />
          {/* 급여 내역 페이지 */}
          <Route
            path={URL.salaryDetails.name}
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SalaryDetailsPage />
              </ProtectedRoute>
            }
          />
          {/* 급여 정정 신청 페이지 */}
          <Route
            path={URL.salaryCorrection.name}
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SalaryCorrectionPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/** Intro */}
        <Route path={URL.login.link} element={<LoginPage />} />
        <Route path={URL.signup.link} element={<SignUpPage />} />

        {/**TODO - /intro/ 중첩 element로 IntroLayout 컴포넌트로 리팩토링 
         * 
          <Route path={URL.login.link} element={<Navigate to="/intro/login" replace />} />
          <Route path={URL.signup.link} element={<Navigate to="/intro/login" replace />} />
          <Route path={NESTED_PATHS.intro.link} element={<IntroLayout />}>
            <Route path={URL.login.name} element={<Login />} />
            <Route path={URL.signup.name} element={<SignUp />} />
          </Route>
         */}

        {/** admin */}
        <Route path={NESTED_PATHS.admin.link} element={<Layout />}>
          {/* 관리자 직원 목록 */}
          <Route path={URL.employeeList.name} element={<EmployeeListPage />} />
          {/* 급여 정정 요청 페이지 */}
          <Route
            path={URL.salaryRequest.name}
            element={<SalaryRequestPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
