import React from 'react';
import styled from 'styled-components';
import { StyledCancelButton, StyledCheckButton } from '..';
import type { ModalProps } from '../../CoreModal';

const ErrorModal: React.FC<ModalProps> = ({ onClose, ModalMessage }) => {
  const handleConfirm = () => {
    onClose();
  };

  const warning = (
    <MaterialIcon className="material-symbols-outlined">warning</MaterialIcon>
  );

  const handleRetry = () => {};

  return (
    <>
      {warning}
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

const MaterialIcon = styled.div`
  font-size: 48px;
`;

export default ErrorModal;
