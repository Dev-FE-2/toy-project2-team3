import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import styled from 'styled-components';
import { fetchUserInfo } from '../../../../firebase';
import type { User } from '../../../../types/interface';

const UserStatus = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = fetchUserInfo((info) => {
      setUserInfo(info);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleProfile = () => {
    navigate('/editProfile');
  };

  const handleLogout = () => {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        console.log('로그아웃 성공');
        setUserInfo(null); // 로그아웃 시 사용자 정보 초기화
        navigate('/login'); // 로그아웃 후 /login으로 리다이렉션
      })

      .catch((error) => {
        console.error('로그아웃 중 오류 발생:', error);
        // 사용자에게 오류 메시지를 보여주는 방법 추가 (예: alert)
      });
  };

  return (
    <StyledBottomContainer>
      {loading ? (
        <p>사용자 정보를 불러오는 중...</p>
      ) : userInfo ? (
        <>
          <img
            src={userInfo.profileImgUrl}
            alt="Profile"
            onClick={handleProfile}
            role="button"
            tabIndex={0} // 접근성을 위한 속성 추가
          />
          <StyledUserInfo>
            <StyledName>{userInfo.name}</StyledName>
            <StyledSchedule>
              {userInfo.schedule || '스케줄 정보 없음'}
            </StyledSchedule>
          </StyledUserInfo>
          <div
            className="material-symbols-outlined"
            onClick={handleLogout}
            role="button"
            tabIndex={0} // 접근성을 위한 속성 추가
          >
            logout
          </div>
        </>
      ) : (
        <p>사용자 정보가 없습니다.</p>
      )}
    </StyledBottomContainer>
  );
};

const StyledBottomContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 10vh;
  display: flex;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  color: #4a493f;
  margin-bottom: 0.5vw;

  .material-symbols-outlined {
    font-size: 42px; // 아이콘 크기 조정
    margin-left: 10px; // 왼쪽 여백 추가
    cursor: pointer; // 커서 변경
  }
`;

const StyledUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-right: 25%;
  box-sizing: border-box;
`;

const StyledName = styled.span`
  font-weight: 700;
  font-size: 1.5em;
`;

const StyledSchedule = styled.span`
  font-weight: 700;
  font-size: 0.8em;
  color: #91918b;
`;

export default UserStatus;
