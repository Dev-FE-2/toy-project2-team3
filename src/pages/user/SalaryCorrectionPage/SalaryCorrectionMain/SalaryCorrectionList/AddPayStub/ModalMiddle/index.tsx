import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../../../../../../styles';
import { useFetchUserInfo } from '../../../../../../../hooks';
import { fetchDataFromDB } from '../../../../../../../firebase';
import type {
  SalaryRequest,
  SalaryRequestItem,
} from '../../../../../../../types/interface';

type ModalMiddleProps = {
  item: SalaryRequest;
};

// 날짜 포맷팅 함수
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const ModalMiddle: React.FC<ModalMiddleProps> = ({ item }) => {
  const [salaryCorrectData, setsalaryCorrecteData] = useState<SalaryRequest[]>(
    []
  );
  const [attachments, setAttachments] = useState<SalaryRequestItem[]>(
    item.requestList || []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const { userInfo, error } = useFetchUserInfo();

  useEffect(() => {
    const fetchSalaryCorrecteData = async () => {
      try {
        setLoading(true);
        const data = await fetchDataFromDB<SalaryRequest>({
          table: 'SalaryRequest',
          key: userInfo?.userId,
        });
        if (data) {
          setsalaryCorrecteData(data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSalaryCorrecteData();
    console.log(salaryCorrectData);
    console.log(setAttachments);
  }, [item.salaryId]);

  return (
    <S.ModalMiddle>
      {!loading && ( // 로딩 중이 아닐 때만 내용 표시
        <>
          <S.ModalMiddleRow>
            <div className="key">제목</div>
            <div className="value">{item.requestedTitle}</div>
          </S.ModalMiddleRow>
          <S.ModalMiddleRow>
            <div className="key">첨부 파일</div>
            <S.ScrollableValue>
              {attachments.length > 0
                ? attachments.map((att) => (
                    <div key={att.requestId} className="padding">
                      {att.requestDocumentUrl ? (
                        <button
                          onClick={() =>
                            window.open(att.requestDocumentUrl, '_blank')
                          }
                        >
                          {att.requestDetail || '첨부 파일 보기'}
                        </button>
                      ) : (
                        '첨부 파일 없음'
                      )}
                    </div>
                  ))
                : '첨부 파일이 없습니다.'}
            </S.ScrollableValue>
          </S.ModalMiddleRow>
          <S.ModalMiddleRow>
            <div className="key">정정 요청 시간</div>
            <S.ScrollableValue>
              {attachments.length > 0
                ? attachments.map((att) => (
                    <p key={att.requestId} style={{ margin: '5px 0' }}>
                      {formatDate(att.requestStartedAt)} ~{' '}
                      {formatDate(att.requestEndedAt)}
                    </p>
                  ))
                : '정정 요청 기록이 없습니다.'}
            </S.ScrollableValue>
          </S.ModalMiddleRow>
          <div className="description">
            {error ? error.message : '설명이 작성되지 않았습니다.'}
          </div>
          <div className="reject">
            거절 사유: {item.rejectReason || '입력되지 않았습니다.'}
          </div>
        </>
      )}
    </S.ModalMiddle>
  );
};

const S = {
  ModalMiddle: styled.div`
    height: 15%;
    font-size: 20px;
    text-align: center;
    font-weight: 700;

    .key {
      width: 20%;
      background-color: #fff;
      border: 1px solid ${colors.semantic.text.gray};
      min-height: 10vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 10px 0;
    }

    .value {
      width: 80%;
      background-color: #fff;
      border: 1px solid ${colors.semantic.text.gray};
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: #4b89dc;
      padding: 10px 0;
      overflow-wrap: break-word;
      overflow: hidden;
    }

    .description {
      background-color: #fff;
      width: 100%;
      border: 1px solid ${colors.semantic.text.gray};
      min-height: 20vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 10px 0;
    }

    .reject {
      background-color: #fff;
      width: 100%;
      border: 1px solid ${colors.semantic.text.gray};
      min-height: 15vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 10px 0;
    }
  `,

  ModalMiddleRow: styled.div`
    display: flex;
    flex-direction: row;
  `,

  ScrollableValue: styled.div`
    width: 80%;
    max-height: 10vh;
    overflow-y: auto;
    background-color: #fff;
    border: 1px solid ${colors.semantic.text.gray};
    color: #4b89dc;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 0;

    .padding {
      padding: 5px 0;
    }
  `,
};

export default ModalMiddle;