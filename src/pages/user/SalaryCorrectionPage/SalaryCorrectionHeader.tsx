import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../styles';

type SalaryCorrectionHeaderProps = {
  isVisible: boolean;
  onToggleVisibility: () => void;
};

export const StyleCorrectiondButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6.25vw;
  height: 4.63vh;
  background-color: ${colors.semantic.primary};
  color: ${colors.semantic.text.light};
  font-size: inherit;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  &:hover {
    background-color: ${colors.semantic.hover.primary};
    color: ${colors.semantic.primary};
  }
  margin-left: auto;
`;

const SalaryCorrectionHeader: React.FC<SalaryCorrectionHeaderProps> = ({
  isVisible,
  onToggleVisibility,
}) => {
  return (
    <S.SalaryHeader>
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
    font-size: 32px;
    margin-right: auto;
    font-weight: bold;
  `,
};

export default SalaryCorrectionHeader;
