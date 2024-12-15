import React, { useEffect } from 'react';
import styled from 'styled-components';
import ErrorModal from '../CoreModal/ErrorModal';
import QuestionModal from '../CoreModal/QuestionModal';
import { colors, font } from '../../../styles';
import SuccessModal from './SuccessModal';

type CoreModalProps = {
  modalType: 'check' | 'error' | 'question';
  modalMessage: string;
  onClose: () => void;
};

export type ModalProps = {
  onClose: () => void;
  ModalMessage: string;
};

const CoreModal: React.FC<CoreModalProps> = ({
  modalType,
  modalMessage,
  onClose,
}) => {
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
        {modalType === 'check' ? (
          <SuccessModal onClose={onClose} ModalMessage={modalMessage} />
        ) : modalType === 'error' ? (
          <ErrorModal onClose={onClose} ModalMessage={modalMessage} />
        ) : modalType === 'question' ? (
          <QuestionModal onClose={onClose} ModalMessage={modalMessage} />
        ) : (
          <div>No type Modal</div>
        )}
      </StyledModalContainer>
    </StyledModalBackground>
  );
};

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

  font-size: ${font.size.subHeading};
  font-weight: 700;
`;

export const StyledCancelButton = styled.div`
  background-color: ${colors.semantic.danger};
  color: ${colors.semantic.text.light};
  border: none;
  cursor: pointer;
  width: 6vw;
  height: 6vh;
  font-size: ${font.size.paragraph};
  font-weight: normal;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledCheckButton = styled.div`
  background-color: ${colors.semantic.success};
  color: ${colors.semantic.text.light};
  border: none;
  cursor: pointer;
  width: 6vw;
  height: 6vh;
  font-size: ${font.size.paragraph};
  font-weight: normal;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default CoreModal;
