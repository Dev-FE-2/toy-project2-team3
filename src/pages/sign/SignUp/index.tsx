import SignUpForm from './SignUpForm';
import { PageContainer, PageTitle, IntroLayout } from '../../../components';

const SignUpPage = () => {
  return (
    <IntroLayout>
      <PageContainer>
        <PageTitle>회원가입</PageTitle>
        <SignUpForm />
      </PageContainer>
    </IntroLayout>
  );
};

export default SignUpPage;
