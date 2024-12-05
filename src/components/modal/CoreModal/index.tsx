import React, { useEffect } from 'react';
import styled from 'styled-components';
import ErrorModal from '../CoreModal/ErrorModal';
import QuestionModal from '../CoreModal/QuestionModal';
import SuccessModal from '../CoreModal/SuccessModal';
import { colors, font } from '../../../styles';

type CoreModalProps = {
  modalType: 'check' | 'error' | 'question';
  modalMessage: string;
  onClose: () => void;
};

export type ModalProps = {
  onClose: () => void;
  message: string;
};

// CoreModal 컴포넌트
const CoreModal: React.FC<CoreModalProps> = ({
  modalType,
  modalMessage,
  onClose,
}) => {
  let content;

  if (modalType === 'check') {
    content = <SuccessModal onClose={onClose} message={modalMessage} />;
  } else if (modalType === 'error') {
    content = <ErrorModal onClose={onClose} message={modalMessage} />;
  } else if (modalType === 'question') {
    content = <QuestionModal onClose={onClose} message={modalMessage} />;
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <StyledModalBackground onClick={onClose}>
      <StyledModalContainer onClick={(e) => e.stopPropagation()}>
        {content}
      </StyledModalContainer>
    </StyledModalBackground>
  );
};

// Styled 컴포넌트
const StyledModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledModalContainer = styled.div`
  background-color: ${colors.semantic.background.light};
  border-radius: 8px;
  border: 0.5px solid ${colors.semantic.primary};
  width: 26.67vw;
  height: 23.7vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1.5vh;
  img {
    width: 3.33vw;
    height: auto;
  }
  font-size: ${font.size.subHeading};
  font-weight: 700;
`;

export default CoreModal;
