import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getAuth, signOut } from 'firebase/auth';
import { logout } from '../../../slices/user/actions';
import { colors } from '../../../styles';

const UserStatus = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        dispatch(logout());
        navigate('/login');
      })

      .catch((error) => {
        console.error('로그아웃 중 오류 발생:', error);
        // 사용자에게 오류 메시지를 보여주는 방법 추가 (예: alert)
      });
  };

  return (
    <S.LoggoutButton
      type="button"
      className="logout-button"
      onClick={handleLogout}
    >
      <span className="material-symbols-outlined">logout</span>
    </S.LoggoutButton>
  );
};

const S = {
  LoggoutButton: styled.button`
    .material-symbols-outlined {
      // 아이콘 크기 및 색상 조정

      font-size: 28px;
      color: ${colors.semantic.nuetralVariant};
      cursor: pointer;
    }
  `,
};

export default UserStatus;
