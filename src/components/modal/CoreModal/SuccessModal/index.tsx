import React from 'react';
import check_circle from '../../../../assets/icons/check_circle.svg';
import { StyledCheckButton } from '../../../Button';
import type { ModalProps } from '../../CoreModal';

const SuccessModal: React.FC<ModalProps> = ({ onClose, message }) => {
  const handleConfirm = () => {
    console.log('확인 버튼 클릭');
    onClose(); // 모달 닫기
  };

  return (
    <>
      <img src={check_circle} alt="help" />
      {message}
      <StyledCheckButton onClick={handleConfirm}>확인</StyledCheckButton>
    </>
  );
};

export default SuccessModal;
