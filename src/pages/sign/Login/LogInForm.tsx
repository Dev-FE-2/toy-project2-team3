import { useState, ChangeEvent, MouseEvent } from 'react';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { Form, Input, ErrorMessage } from '../../../components';

type ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => void;
type ClickEventHandler = (event: MouseEvent<HTMLButtonElement>) => void;

const LoginForm = () => {
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

      alert('성공적으로 로그인 했습니다!');

      console.log('로그인 성공 후 반환되는 데이터', userCredential);
    } catch (error) {
      if (error instanceof FirebaseError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('알 수 없는 에러가 발생했습니다!');
      }
    }
  };

  return (
    <Form>
      <Input
        type="email"
        label="이메일"
        name="email"
        value={email}
        placeholder="이메일을 입력해주세요"
        onChange={onChangeEmail}
      />
      <Input
        type="password"
        label="비밀번호"
        name="password"
        value={password}
        placeholder="비밀번호를 입력해주세요"
        onChange={onChangePassword}
      />
      <button className="button primary" type="submit" onClick={handleSubmit}>
        로그인
      </button>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Form>
  );
};

export default LoginForm;
