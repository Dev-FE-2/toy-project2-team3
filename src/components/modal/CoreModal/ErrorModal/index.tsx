import React from 'react';
import styled from 'styled-components';
import warning from '../../../../assets/icons/warning.svg';
import { StyledCancelButton, StyledCheckButton } from '../../../Button';
import type { ModalProps } from '../../CoreModal';

const ErrorModal: React.FC<ModalProps> = ({ onClose, ModalMessage }) => {
  const handleConfirm = () => {
    console.log('확인 버튼 클릭');
    onClose(); // 모달 닫기
  };

  const handleRetry = () => {};

  return (
    <>
      <img src={warning} alt="help" />
      {ModalMessage}
      <StyledButtonContainer>
        <StyledCheckButton onClick={handleConfirm}>확인</StyledCheckButton>
        <StyledCancelButton onClick={handleRetry}>다시시도</StyledCancelButton>
      </StyledButtonContainer>
    </>
  );
};

const StyledButtonContainer = styled.div`
  display: flex;
  gap: 3.36vw;
`;

export default ErrorModal;
