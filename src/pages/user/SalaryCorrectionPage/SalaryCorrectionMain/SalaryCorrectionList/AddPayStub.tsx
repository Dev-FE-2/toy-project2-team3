import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { colors } from '../../../../../styles';
import type { SalaryRequest } from '../../../../../types/interface';
import ModalHeader from './AddPayStub/ModalHeader';
import ModalMiddle from './AddPayStub/ModalMiddle';

type AddPayStubProps = {
  item: SalaryRequest;
  onClose: () => void;
};

const AddPayStub: React.FC<AddPayStubProps> = ({ item, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <StyledModalOverlay>
      <StyledModalContainer ref={modalRef}>
        <h1>급여 정정 신청서</h1>
        <StyledModalContent>
          <ModalHeader />
          <ModalMiddle item={item} />
        </StyledModalContent>
      </StyledModalContainer>
    </StyledModalOverlay>
  );
};
const StyledModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledModalContainer = styled.div`
  background-color: #fff;
  width: 40vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    font-size: 32px;
    font-weight: 700;
  }
`;

const StyledModalContent = styled.div`
  width: 90%;
  height: 85%;
  border: 2px solid ${colors.semantic.text.dark};
  margin: 1.5vh 0;
`;

export default AddPayStub;
