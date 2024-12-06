import React from 'react';
import { StyledCheckButton, StyledCancelButton } from '../../../Button';
import help from '../../../../assets/icons/help.svg';
import styled from 'styled-components';
import type { ModalProps } from '../../CoreModal';

const QuestionModal: React.FC<ModalProps> = ({ onClose, ModalMessage }) => {
  const handleConfirm = () => {
    console.log('확인 버튼 클릭');
    onClose(); // 모달 닫기
  };

  const handleCancel = () => {
    console.log('취소 버튼 클릭');
    onClose(); // 모달 닫기
  };

  return (
    <>
      <img src={help} alt="help" />
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

export default QuestionModal;
