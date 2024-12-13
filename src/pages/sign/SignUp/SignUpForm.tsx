import { useState, MouseEvent, ChangeEvent } from 'react';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, database } from '../../../firebaseConfig';
import { generateEmployeeId } from '../../../utils';
import { COLLECTION_NAME } from '../../../constant';
import { Form, Input, ErrorMessage } from '../../../components';

type ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => void;
type ClickEventHandler = (event: MouseEvent<HTMLButtonElement>) => void;

export interface User {
  userId?: string;
  email: string;
  password: string;
  rePassword: string;
  name: string;
  phoneNumber: string;
  address?: string;
  addressDetail?: string;
  profileImgUrl?: string;
  employeeNumber?: string;
  position?: string;
  team?: string;
  department?: string;
  isAdmin?: boolean;
  isActivated?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const SignUpForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState<User>({
    email: '',
    password: '',
    rePassword: '',
    phoneNumber: '',
    name: '',
  });

  // 이벤트 핸들러
  const handleChange: ChangeEventHandler = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit: ClickEventHandler = async () => {
    try {
      // 1. Firebase Authentication 회원가입
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const userId = userCredential.user.uid;

      // 2. Realtime Database에 추가 사용자 정보 저장
      const userRef = ref(database, `${COLLECTION_NAME.users}/${userId}`);
      const timestamp = new Date().toISOString();

      const userWithMetaData: User = {
        ...formData,
        userId,
        address: '',
        addressDetail: '',
        employeeNumber: generateEmployeeId(),
        profileImgUrl: '',
        position: '',
        team: '',
        department: '',
        isAdmin: false,
        isActivated: true,
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      await set(userRef, userWithMetaData);

      alert(`회원 가입을 완료 했습니다!`);
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
        value={formData.email}
        placeholder="이메일"
        onChange={handleChange}
      />
      <Input
        type="password"
        label="비밀번호"
        name="password"
        value={formData.password}
        placeholder="비밀번호"
        onChange={handleChange}
      />
      <Input
        type="password"
        label="비밀번호 확인"
        name="rePassword"
        value={formData.rePassword}
        placeholder="비밀번호 확인"
        onChange={handleChange}
      />
      <Input
        type="text"
        label="이름"
        name="name"
        value={formData.name}
        placeholder="이름"
        onChange={handleChange}
      />
      <Input
        type="tel"
        label="전화번호"
        name="phoneNumber"
        value={formData.phoneNumber}
        placeholder="전화번호"
        onChange={handleChange}
      />
      <button className="button primary" type="submit" onClick={handleSubmit}>
        회원가입
      </button>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Form>
  );
};

export default SignUpForm;
