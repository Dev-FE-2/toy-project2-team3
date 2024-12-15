import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { colors } from '../../../../../styles';
import type { Item } from '../index';
import ModalHeader from './ModalHeader';
import ModalMiddle from './ModalMiddle';
import ModalBottom from './ModalBottom';
interface NormalPayStubProps {
  item: Item;
  onClose: () => void;
}

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
  h1 {
    font-size: 32px;
  }
  font-weight: 700;
`;

const StyledModalContainer = styled.div`
  background-color: #fff;
  width: 40vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const StyledModalContent = styled.div`
  width: 90%;
  height: 85%;
  border: 2px solid ${colors.semantic.text.dark};
  margin: 1.5vh 0;
`;

const StyledModalDivision = styled.div`
  height: 7.5%;
  background-color: ${colors.semantic.background.light};
  font-weight: 700;
  font-size: 24px;
  display: flex;
  align-items: center; /* 수평 가운데 정렬 */
  justify-content: center; /* 수직 가운데 정렬 */
  border-bottom: 2px solid ${colors.semantic.text.dark};
  z-index: 1;
`;

const NormalPayStub: React.FC<NormalPayStubProps> = ({ item, onClose }) => {
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
        <h1>임금 명세서</h1>
        <StyledModalContent>
          <ModalHeader />
          <StyledModalDivision>세부 내역</StyledModalDivision>
          <ModalMiddle item={item} />
          <StyledModalDivision>계산 방법</StyledModalDivision>
          <ModalBottom item={item}></ModalBottom>
        </StyledModalContent>
      </StyledModalContainer>
    </StyledModalOverlay>
  );
};

export default NormalPayStub;

// <p>아이디: {item.id}</p>
// <p>날짜: {item.date}</p>
// <p>총 근무 시간: {item.totalTime}</p>
// <p>기본 급여: {item.basicSalary}</p>
// <p>초과 근무 급여: {item.overSalary}</p>
// <p>총 급여: {item.totalSalary}</p>
