import React, { useState } from 'react';
import styled from 'styled-components';
import { useFetchUserInfo } from '../../../../../hooks';
import { saveDataToDB } from '../../../../../firebase';
import type { OvertimeRecord } from './ApplyMiddle';
import type { SalaryRequest } from '../../../../../types/interface';
import { colors } from '../../../../../styles';
import Loading from '../../../../../components/Loading';
import { fetchDataFromDB } from '../../../../../firebase';
import { CoreModal } from '../../../../../components';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'check' | 'error' | 'question'>(
    'check'
  );
  const [modalMessage, setModalMessage] = useState('');
  const { userInfo, isLoading, error } = useFetchUserInfo();
  const [isSaving, setIsSaving] = useState(false);

  const openModal = (type: 'check' | 'error' | 'question', message: string) => {
    setModalType(type);
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsVisible(false);
  };

  const handleRegister = async () => {
    const createdAt = new Date().toISOString();
    const requestedMonth = new Date(createdAt).getMonth();

    const newSalaryRequestId = `salaryRequestId-${new Date().getTime()}`;
    const newSalaryId = `salaryId-${new Date().getTime()}`;

    // 여러 요청 항목 생성
    const requestList = overtimeRecords.map((record) => ({
      requestId: `requestId-${new Date().getTime()}`,
      requestStartedAt: record.start,
      requestEndedAt: record.end,
      requestWorkingTime: record.hours,
      requestDetail: record.description,
      requestDocumentUrl: record.filePath,
    }));

    const newSalaryRequest: SalaryRequest = {
      handleDetail: '',
      handleStatus: '처리 전',
      handledAt: '',
      handledUserId: '',
      rejectReason: '',
      requestList,
      requestedAt: createdAt,
      requestedTitle: `${requestedMonth}월 급여 정산 오류`,
      requestedUserId: userInfo?.userId as string,
      salaryId: newSalaryId,
    };

    setIsSaving(true);

    try {
      const existingData =
        (await fetchDataFromDB<SalaryRequest>({
          table: 'SalaryRequest',
          key: userInfo?.userId,
        })) || {};

      // 기존 요청 데이터에서 특정 SalaryRequestId 찾기
      const existingRequestId = Object.keys(existingData).find(
        (id) => id === newSalaryRequestId
      );

      let updatedData;

      if (existingRequestId) {
        // 기존 요청이 있을 경우
        updatedData = {
          ...existingData,
          [existingRequestId]: {
            ...existingData[existingRequestId],
            requestList: [
              ...(existingData[existingRequestId]?.requestList || []),
              ...requestList,
            ],
          },
        };
      } else {
        // 새로운 SalaryRequestId 생성
        updatedData = {
          ...existingData,
          [newSalaryRequestId]: newSalaryRequest,
        };
      }

      // saveDataToDB를 사용하여 데이터 저장
      await saveDataToDB({
        table: 'SalaryRequest',
        key: userInfo?.userId,
        data: updatedData,
      });
      openModal('check', '정정 신청이 정상적으로 처리 되었습니다');
    } catch (err) {
      console.error(err);
      openModal('error', '정정 신청 저장 중 오류가 발생했습니다.');
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

      {isModalOpen && (
        <CoreModal
          modalType={modalType}
          modalMessage={modalMessage}
          onClose={closeModal}
        />
      )}
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
      border-radius: 8px;
      cursor: pointer;
      &:hover {
        background-color: ${colors.semantic.hover.primary};
        color: ${colors.semantic.text.dark};
      }
      border-radius: 8px;
      cursor: pointer;
      &:hover {
        background-color: ${colors.semantic.hover.primary};
        color: ${colors.semantic.text.dark};
      }
    }
  `,
};

export default ApplyBottom;
