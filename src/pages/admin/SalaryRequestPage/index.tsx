import { styled } from 'styled-components';
import { colors } from '../../../styles';

const SalaryRequestPage = () => {
  return <S.Content>임금 정정 요청 내용입니다.</S.Content>;
};

const S = {
  Content: styled.div`
    height: 100vh;
    width: 100%;
    background-color: ${colors.semantic.background.light};
  `,
};

export default SalaryRequestPage;
