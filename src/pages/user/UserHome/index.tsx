import React, { useState, useEffect } from 'react';
import { auth } from '../../../firebaseConfig'; // Firebase 설정 파일에서 auth 가져오기
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';

function UserHome() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState(null); // 로그인된 사용자 상태
    const [userInfo, setUserInfo] = useState(null); // 사용자 정보 상태

    const handleLogin = async (e) => {
        e.preventDefault(); // 폼 제출 시 페이지 리로드 방지
        setError(''); // 이전 오류 메시지 초기화

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const loggedInUser = userCredential.user;
            setUser(loggedInUser); // 로그인된 사용자 상태 업데이트
            console.log('로그인 성공:', loggedInUser);
        } catch (error) {
            console.error('로그인 오류:', error.message);
            setError(error.message); // 오류 메시지 설정
        }
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (user) {
                const db = getDatabase();
                const userRef = ref(db, `Users/${user.uid}`);
                const snapshot = await get(userRef);
                if (snapshot.exists()) {
                    setUserInfo(snapshot.val()); // 사용자 정보 설정
                } else {
                    console.log('사용자 정보가 없습니다.');
                }
            }
        };

        fetchUserInfo();
    }, [user]); // user가 변경될 때마다 사용자 정보 가져오기

    return (
        <>
            <h1>메인페이지입니다.</h1>
            {!user ? (
                <div>
                    <h2>로그인</h2>
                    <form onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="email">이메일:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password">비밀번호:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">로그인</button>
                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>} {/* 오류 메시지 표시 */}
                </div>
            ) : (
                <div>
                    <h2>환영합니다, {userInfo ? userInfo.name : '사용자'}님!</h2>
                    {userInfo && (
                        <div>
                            <p>이메일: {userInfo.email}</p>
                            <p>부서: {userInfo.department}</p>
                            <p>팀: {userInfo.team}</p>
                            <p>전화번호: {userInfo.phoneNumber}</p>
                            <p>주소: {userInfo.address}, {userInfo.addressDetail}</p>
                            {/* 추가적으로 필요한 사용자 정보 표시 */}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default UserHome;
