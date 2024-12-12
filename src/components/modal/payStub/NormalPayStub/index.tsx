import React from 'react';
import styled from 'styled-components';

type NomalPayStubProps = {
  item: {
    date: string;
    totalTime: string;
    basicSalary: string;
    overSalary: string;
    totalSalary: string;
  } | null;
  onClose: () => void;
};

const NomalPayStub: React.FC<NomalPayStubProps> = ({ item, onClose }) => {
  if (!item) return null; // 아이템이 없으면 null 반환

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>급여 명세서</h2>
        <div>
          <p>근무 년월: {item.date}</p>
          <p>총 근무 시간: {item.totalTime}시간</p>
          <p>기본급: {item.basicSalary}원</p>
          <p>초과 근무 수당: {item.overSalary}원</p>
          <p>총 금액: {item.totalSalary}원</p>
        </div>
        <button onClick={onClose}>닫기</button>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
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

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 400px;
`;

export default NomalPayStub;
