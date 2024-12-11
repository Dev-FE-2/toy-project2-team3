import useSWR from 'swr';
import { collection } from '../../../constant';
import type { User } from './../../../types/interface';
import { default as Loading } from '../../../components/Loading';
import { default as LoginForm } from './LogInForm';

const Login = () => {
  const { data, error, isLoading } = useSWR<User[]>({
    table: collection.users,
  });
  if (isLoading) return <Loading />;
  if (error) return <div>오류 발생: {error.message}</div>;

  return (
    <section>
      <h1>로그인</h1>
      <LoginForm />
      <ul>
        {data ? (
          data.map((user) => <li key={user.userId}>{user.name}</li>)
        ) : (
          <li>데이터가 없습니다.</li>
        )}
      </ul>
    </section>
  );
};

export default Login;
