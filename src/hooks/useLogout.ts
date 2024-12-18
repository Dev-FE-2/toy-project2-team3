import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';
import { logout } from '../slices/user/actions';
import { URL } from '../constant';

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        dispatch(logout());
        navigate(URL.login.link);
      })

      .catch((error) => {
        console.error('로그아웃 중 오류 발생:', error);
        /**TODO - 사용자에게 오류 메시지를 보여주는 방법 추가 (예: alert) */
      });
  };

  return { handleLogout };
};

export { useLogout };
