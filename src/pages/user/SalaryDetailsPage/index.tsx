import SalaryDetailsMain from './SalaryDetailsMain';
import styled from 'styled-components';

const SalaryDetails = () => {
  return (
    <S.SalaryContainer>
      <S.MainContainer>
        <SalaryDetailsMain />
      </S.MainContainer>
    </S.SalaryContainer>
  );
};

const S = {
  SalaryContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
  MainContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  `,
};

export default SalaryDetails;
