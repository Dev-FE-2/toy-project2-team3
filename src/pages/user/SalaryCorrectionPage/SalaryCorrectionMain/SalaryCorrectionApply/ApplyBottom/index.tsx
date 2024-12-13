import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../../../../styles';

type BottomProps = {
  overtimeTotal: number;
};

const ApplyBottom: React.FC<BottomProps> = ({ overtimeTotal }) => {
  // 총 시간을 시간과 분으로 변환
  const formatOvertimeTotal = (totalHours: number) => {
    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60);
    return `${hours}시간 ${minutes}분`;
  };

  return (
    <S.ApplyBottomContainer>
      <p>연장 근무 합계 시간 : {formatOvertimeTotal(overtimeTotal)}</p>
      <button className="reg-btn" value="등록하기">
        등록하기
      </button>
    </S.ApplyBottomContainer>
  );
};

const S = {
  ApplyBottomContainer: styled.div`
    width: 100%;
    height: 17vh;
    padding: 20px;
    display: flex;
    flex-direction: column; // 세로 방향으로 정렬
    align-items: center; // 가운데 정렬
    p {
      text-align: left; // 왼쪽 정렬
      margin-bottom: 0.7vh;
      width: 100%; // 전체 너비를 차지하도록
    }
    .reg-btn {
      background-color: ${colors.semantic.primary};
      margin-top: 4vh;
      color: white;
      width: 6vw;
      min-height: 5vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `,
};

export default ApplyBottom;
