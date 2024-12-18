import { useState } from 'react';
import styled from 'styled-components';
import SalaryCorrectionHeader from './SalaryCorrectionHeader';
import SalaryCorrectionMiddle from './SalaryCorrectionMain';

const SalaryCorrectionPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibilityChange = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <>
      <S.SalaryContainer>
        <SalaryCorrectionHeader
          isVisible={isVisible}
          onToggleVisibility={handleVisibilityChange}
        />
        <S.MainContainer>
          <SalaryCorrectionMiddle
            isVisible={isVisible}
            setIsVisible={setIsVisible}
          />
        </S.MainContainer>
      </S.SalaryContainer>
    </>
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

export default SalaryCorrectionPage;
