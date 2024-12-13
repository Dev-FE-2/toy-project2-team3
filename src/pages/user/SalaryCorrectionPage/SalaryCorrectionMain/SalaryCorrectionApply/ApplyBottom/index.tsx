import React from 'react';
import styled from 'styled-components';
import { useSaveData } from '../../../../../../hooks/';
import type { OvertimeRecord } from '../ApplyMiddle';
import type { SalaryRequest } from '../../../../../../types/interface';
import { colors } from '../../../../../../styles';

type ApplyBottomProps = {
  overtimeTotal: number;
  overtimeRecords: OvertimeRecord[];
  setIsVisible: (visible: boolean) => void;
};

const ApplyBottom: React.FC<ApplyBottomProps> = ({
  overtimeRecords,
  overtimeTotal,
  setIsVisible,
}) => {
  const { saveData, isSaving, error } = useSaveData<SalaryRequest>({
    table: 'SalaryRequest',
  });

  const handleRegister = async () => {
    const newSalaryRequest: SalaryRequest = {
      salaryRequestId: '',
      requestedUserId: 'gRvGt6IuotQ2d3FzXXFoCbepLAg1',
      salaryId: '',
      requestList: overtimeRecords.map((record, index) => ({
        requestId: `fixedRequestItemId${index}`,
        requestStartedAt: record.start,
        requestEndedAt: record.end,
        requestWorkingTime: record.hours,
        requestDetail: record.description,
        requestDocumentUrl: record.filePath,
      })),
      requestedAt: new Date().toISOString(),
      handledUserId: '',
      handleStatus: '처리 전',
      handleDetail: '',
      handledAt: '',
    };

    try {
      // 데이터 저장
      const savedKey = await saveData(newSalaryRequest);
      console.log('요청이 성공적으로 저장되었습니다. 키:', savedKey);
      setIsVisible(false);
    } catch (err) {
      console.error('저장 중 오류 발생:', err);
    }
  };

  // 총 시간을 시간과 분으로 변환
  const formatOvertimeTotal = (totalHours: number) => {
    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60);
    return `${hours}시간 ${minutes}분`;
  };

  return (
    <S.ApplyBottomContainer>
      <p>연장 근무 합계 시간 : {formatOvertimeTotal(overtimeTotal)}</p>
      <button className="reg-btn" onClick={handleRegister} disabled={isSaving}>
        {isSaving ? '저장 중...' : '등록하기'}
      </button>
      {error && <p>오류가 발생했습니다: {error.message}</p>}
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
