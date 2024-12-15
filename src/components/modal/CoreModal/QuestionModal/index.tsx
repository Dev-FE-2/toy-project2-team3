import React from 'react';
import { StyledCheckButton, StyledCancelButton } from '../';
import styled from 'styled-components';
import type { ModalProps } from '../../CoreModal';

const QuestionModal: React.FC<ModalProps> = ({ onClose, ModalMessage }) => {
  const handleConfirm = () => {
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const help = (
    <MaterialIcon className="material-symbols-outlined">help</MaterialIcon>
  );

  return (
    <>
      {help}
      {ModalMessage}
      <StyledButtonContainer>
        <StyledCancelButton onClick={handleCancel}>취소</StyledCancelButton>
        <StyledCheckButton onClick={handleConfirm}>확인</StyledCheckButton>
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

export default QuestionModal;
