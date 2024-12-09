import { useFetchUsers } from '../../../hooks';
import { default as LoginForm } from './LogInForm';
import { default as Loading } from '../../../components/Loading';

const Login = () => {
  const { data, error, isLoading } = useFetchUsers();

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) return <div>오류 발생: {error.message}</div>;

  return (
    <section>
      <h1>로그인</h1>
      <LoginForm />
      <ul>
        {data.length > 0 ? (
          data.map((user) => <li key={user.userId}>{user.name}</li>)
        ) : (
          <li>데이터가 없습니다.</li>
        )}
      </ul>
    </section>
  );
};

export default Login;
