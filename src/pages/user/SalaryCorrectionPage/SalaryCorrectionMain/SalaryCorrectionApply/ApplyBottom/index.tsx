import React, { useState } from 'react';
import styled from 'styled-components';
import { useFetchUserInfo } from '../../../../../../hooks/';
import { saveDataToDB } from '../../../../../../firebase';
import type { OvertimeRecord } from '../ApplyMiddle';
import type { SalaryRequest } from '../../../../../../types/interface';
import { colors } from '../../../../../../styles';
import Loading from '../../../../../../components/Loading';
import { fetchDataFromDB } from '../../../../../../firebase';

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
  const { userInfo, isLoading, error } = useFetchUserInfo();
  const [isSaving, setIsSaving] = useState(false);

  const handleRegister = async () => {
    const createdAt = new Date().toISOString();
    const requestedMonth = new Date(createdAt).toLocaleString('ko-KR', {
      month: 'long',
    });

    const newSalaryRequestId = `salaryRequestId-${new Date().getTime()}`;
    const newSalaryId = `salaryId-${new Date().getTime()}`; // 고유한 salaryId 생성

    const newRequestItem = {
      requestId: `requestId-${new Date().getTime()}`,
      requestStartedAt: overtimeRecords[0].start,
      requestEndedAt: overtimeRecords[0].end,
      requestWorkingTime: overtimeRecords[0].hours,
      requestDetail: overtimeRecords[0].description,
      requestDocumentUrl: overtimeRecords[0].filePath,
    };

    const newSalaryRequest: SalaryRequest = {
      handleDetail: '',
      handleStatus: '처리 전',
      handledAt: '',
      handledUserId: '',
      rejectReason: '',
      requestList: [newRequestItem],
      requestedAt: createdAt,
      requestedTitle: `${requestedMonth} 급여 정산 오류`,
      requestedUserId: userInfo?.userId as string,
      salaryId: newSalaryId,
    };

    setIsSaving(true);
    try {
      const existingData = await fetchDataFromDB<SalaryRequest>({
        table: 'SalaryRequest',
        key: userInfo?.userId,
      });

      // 기존 요청 데이터가 있을 경우
      const updatedData = existingData
        ? {
            ...existingData.reduce((acc, curr) => {
              acc[curr.id] = curr;
              return acc;
            }, {}),
            [newSalaryRequestId]: {
              ...newSalaryRequest,
              requestList: existingData[0]?.requestList
                ? [...existingData[0].requestList, newRequestItem]
                : [newRequestItem],
            },
          }
        : {
            [newSalaryRequestId]: newSalaryRequest,
          };

      // saveDataToDB를 사용하여 데이터 저장
      await saveDataToDB({
        table: 'SalaryRequest',
        key: userInfo?.userId,
        data: updatedData,
      });

      console.log('요청이 성공적으로 저장되었습니다.');
      setIsVisible(false);
    } catch (err) {
      console.error('저장 중 오류 발생:', err);
    } finally {
      setIsSaving(false);
    }
  };

  // 로딩 상태 처리
  if (isLoading) return <Loading />;
  if (error) return <div>오류 발생: {error.message}</div>;

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
    flex-direction: column;
    align-items: center;
    p {
      text-align: left;
      margin-bottom: 0.7vh;
      width: 100%;
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
