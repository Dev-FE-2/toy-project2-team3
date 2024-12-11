import React from 'react';
import styled from 'styled-components';
import { StyleCorrectiondButton } from '../../../../components/Button';

type SalaryCorrectionHeaderProps = {
  isVisible: boolean;
  onToggleVisibility: () => void;
};

const SalaryCorrectionHeader: React.FC<SalaryCorrectionHeaderProps> = ({
  isVisible,
  onToggleVisibility,
}) => {
  return (
    <S.SalaryHeader>
      <S.Title>급여 정정 내역</S.Title>
      {!isVisible && (
        <StyleCorrectiondButton onClick={onToggleVisibility}>
          정정 신청
        </StyleCorrectiondButton>
      )}
    </S.SalaryHeader>
  );
};

const S = {
  SalaryHeader: styled.div`
    width: 100%;
    display: flex;
  `,
  Title: styled.div`
    margin-left: 7vw;
    font-size: 32px;
    margin-right: auto;
    font-weight: bold;
  `,
};

export default SalaryCorrectionHeader;
