import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Nav } from '../utils';
import { Home, Login, SignUP, Calendar, EditProfile, Salary } from '../pages';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Nav />}>  {/* 사이드 바 중첩 라우팅 */}
                    <Route index element={<Navigate to="/login" replace />} /> {/* 기본 경로는 로그인 페이지로 리다이렉트 */}
                    <Route path="home" element={<Home />} /> {/* 메인 페이지 */}
                    <Route path="calendar" element={<Calendar />} /> {/* 업무 일정 페이지 */}
                    <Route path="edit-profile" element={<EditProfile />} /> {/* 회원 정보 페이지 */}
                    <Route path="salary" element={<Salary />} /> {/* 급여 관련 페이지 */}
                </Route>
                <Route path="/login" element={<Login />} /> {/* 로그인 페이지 */}
                <Route path="/signup" element={<SignUP />} /> {/* 회원가입 페이지 */}
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
