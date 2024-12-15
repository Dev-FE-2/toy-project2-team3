import React from 'react';
import { StyledCheckButton } from '../../../form/Button';
import type { ModalProps } from '../../CoreModal';
import styled from 'styled-components';

const SuccessModal: React.FC<ModalProps> = ({ onClose, ModalMessage }) => {
  const handleConfirm = () => {
    onClose();
  };

  const check_circle = (
    <MaterialIcon className="material-symbols-outlined">
      check_circle
    </MaterialIcon>
  );

  return (
    <>
      {check_circle}
      {ModalMessage}
      <StyledCheckButton onClick={handleConfirm}>확인</StyledCheckButton>
    </>
  );
};

const MaterialIcon = styled.div`
  font-size: 48px;
`;

export default SuccessModal;
