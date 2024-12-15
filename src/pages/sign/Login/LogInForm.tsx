import { useState, ChangeEvent, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref, get, DatabaseReference } from 'firebase/database';
import { auth, database } from '../../../firebaseConfig';
import { login } from '../../../slices/user/actions';
import { User } from '../../../types/interface';
import { COLLECTION_NAME, URL } from '../../../constant';
import { Form, Input, ErrorMessage, LinkText } from '../../../components';

type UserState = Pick<
  User,
  | 'userId'
  | 'email'
  | 'name'
  | 'profileImgUrl'
  | 'team'
  | 'position'
  | 'department'
  | 'isActivated'
  | 'isAdmin'
>;
type ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => void;
type ClickEventHandler = (event: MouseEvent<HTMLButtonElement>) => void;

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onChangeEmail: ChangeEventHandler = (event) =>
    setEmail(event.target.value);
  const onChangePassword: ChangeEventHandler = (event) =>
    setPassword(event.target.value);
  const handleSubmit: ClickEventHandler = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { uid } = userCredential.user;
      const dbRef: DatabaseReference = ref(
        database,
        `${COLLECTION_NAME.users}/${uid}`
      );
      const snapshot = await get(dbRef);
      const userInfo: UserState = snapshot.val();

      dispatch(
        login({
          userId: userInfo.userId,
          email: userInfo.email,
          name: userInfo.name,
          profileImgUrl: userInfo.profileImgUrl,
          team: userInfo.team,
          position: userInfo.position,
          department: userInfo.department,
          isAdmin: userInfo.isAdmin,
          isActivated: userInfo.isActivated,
        })
      );

      navigate(URL.index.link);
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error(error.message, error);
        setErrorMessage('확인되지 않습니다. 이메일과 비밀번호를 확인하세요.');
      } else {
        console.error(error);
        setErrorMessage('알 수 없는 에러가 발생했습니다!');
      }
    }
  };

  return (
    <Form>
      <LinkText linkTo={URL.signup.link}>
        아직 회원가입하지 않으셨나요? <strong>회원가입하기</strong>
      </LinkText>
      <Input
        type="email"
        label="이메일"
        name="email"
        value={email}
        placeholder="이메일을 입력해주세요"
        onChange={onChangeEmail}
        required={true}
      />
      <Input
        type="password"
        label="비밀번호"
        name="password"
        value={password}
        placeholder="비밀번호를 입력해주세요"
        onChange={onChangePassword}
        required={true}
      />
      <button className="button primary" type="submit" onClick={handleSubmit}>
        로그인
      </button>
      <ErrorMessage>{errorMessage}</ErrorMessage>
      {/* <LinkText linkTo="">
        비밀번호를 잊으셨나요? <strong>비밀번호 재설정</strong>
      </LinkText> */}
    </Form>
  );
};

export default LoginForm;
