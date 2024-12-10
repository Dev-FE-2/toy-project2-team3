import { useState } from 'react';
import styled from 'styled-components';
import SalaryCorrectionHeader from './SalaryCorrectionHeader';
import SalaryCorrectionMiddle from './SalaryCorrectionMain';

const SalaryCorrection = () => {
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
        <SalaryCorrectionMiddle isVisible={isVisible} />
      </S.SalaryContainer>
    </>
  );
};

const S = {
  SalaryContainer: styled.div`
    display: flex;
    flex-direction: column;
  `,
};

export default SalaryCorrection;
