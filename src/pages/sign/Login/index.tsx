import LoginForm from './LogInForm';
import { PageContainer, PageTitle, IntroLayout } from '../../../components';

const LoginPage = () => {
  return (
    <IntroLayout>
      <PageContainer>
        <PageTitle>로그인</PageTitle>
        <LoginForm />
      </PageContainer>
    </IntroLayout>
  );
};

export default LoginPage;
