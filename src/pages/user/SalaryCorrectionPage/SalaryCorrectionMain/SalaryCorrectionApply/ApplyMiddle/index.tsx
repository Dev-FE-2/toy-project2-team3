import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { colors } from '../../../../../../styles';
import { uploadFile, deleteFile } from '../../../../../../utils';
import { useFetchUserInfo } from '../../../../../../hooks';

export type RequestDetail = {
  requestDetail: string;
  requestDocumentUrl: string;
  requestEndedAt: string;
  requestId: string;
  requestStartedAt: string;
  requestWorkingTime: number;
};

export type OvertimeRecord = {
  start: string;
  end: string;
  hours: number;
  description: string;
  filePath?: string;
  requestList: RequestDetail[];
};

type MiddleProps = {
  onOvertimeUpdate: (newTotal: number) => void;
  setOvertimeRecords: React.Dispatch<React.SetStateAction<OvertimeRecord[]>>;
  overtimeTotal: number;
  setOvertimeTotal: React.Dispatch<React.SetStateAction<number>>;
};

// 초과 근무 시간 포맷
export const formatOvertimeTotal = (totalHours: number) => {
  const hours = Math.floor(totalHours);
  const minutes = Math.round((totalHours - hours) * 60);
  return `${hours}시간 ${minutes}분`;
};

// URL에서 이름 추출
export const getFilteredFileNames = (filePaths: string[]) => {
  return filePaths
    .map((path) => {
      const decodedPath = decodeURIComponent(path);
      const fileNameWithQuery = decodedPath.split('/').pop();
      const fileName = fileNameWithQuery?.split('?')[0];
      return fileName?.replace(/^\d+_?/, '');
    })
    .join(', ');
};

// 날짜 포맷
const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  return date
    .toLocaleString('ko-KR', options)
    .replace(',', '')
    .replace('PM', '오후')
    .replace('AM', '오전');
};

const ApplyMiddle: React.FC<MiddleProps> = ({
  onOvertimeUpdate,
  setOvertimeRecords,
  overtimeTotal,
  setOvertimeTotal,
}) => {
  const [overtimeStart, setOvertimeStart] = useState('');
  const [overtimeEnd, setOvertimeEnd] = useState('');
  const [description, setDescription] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileName, setFileName] = useState<string>('파일 선택');
  const [overtimeRecords, setLocalOvertimeRecords] = useState<OvertimeRecord[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { userInfo, error } = useFetchUserInfo();

  if (error) return <div>오류 발생: {error.message}</div>;
  const userId = userInfo?.userId;

  const handleAdd = async () => {
    if (overtimeStart && overtimeEnd) {
      const start = new Date(overtimeStart);
      const end = new Date(overtimeEnd);
      if (start > end) {
        alert('종료시간이 시작 시간보다 빠를 순 없습니다.');
        return;
      }
      const hoursDiff = Math.abs(end.getTime() - start.getTime()) / 36e5;

      const filePaths: string[] = [];
      const uploadPromises = uploadedFiles.map(async (file) => {
        return uploadFile(file, `SalaryCorrection/${userId}`, setIsLoading);
      });

      const urls = await Promise.all(uploadPromises);
      urls.forEach((url) => {
        if (url) {
          filePaths.push(url);
        }
      });

      const newRequestId = `requestId-${Date.now()}`;

      // 새로운 요청 생성
      const newRequest: RequestDetail = {
        requestDetail: description,
        requestDocumentUrl: filePaths.join(', '),
        requestEndedAt: overtimeEnd,
        requestId: newRequestId,
        requestStartedAt: overtimeStart,
        requestWorkingTime: hoursDiff,
      };

      // 기존 OvertimeRecord를 찾기
      const existingRecordIndex = overtimeRecords.findIndex(
        (record) => record.start === overtimeStart && record.end === overtimeEnd
      );

      if (existingRecordIndex !== -1) {
        // 기존 OvertimeRecord가 있을 경우 requestList에 추가
        setLocalOvertimeRecords((prevRecords) => {
          const updatedRecords = [...prevRecords];
          updatedRecords[existingRecordIndex].requestList.push(newRequest);
          return updatedRecords;
        });
        setOvertimeRecords((prevRecords) => {
          const updatedRecords = [...prevRecords];
          updatedRecords[existingRecordIndex].requestList.push(newRequest);
          return updatedRecords;
        });
      } else {
        // 새로운 OvertimeRecord 생성
        const newRecord: OvertimeRecord = {
          start: overtimeStart,
          end: overtimeEnd,
          hours: hoursDiff,
          description,
          filePath: filePaths.join(', '),
          requestList: [newRequest],
        };

        // 상태 업데이트
        setLocalOvertimeRecords((prevRecords) => [newRecord, ...prevRecords]);
        setOvertimeRecords((prevRecords) => [newRecord, ...prevRecords]);
      }

      const newTotal = overtimeTotal + hoursDiff;
      onOvertimeUpdate(newTotal);

      // 입력 초기화
      setOvertimeStart('');
      setOvertimeEnd('');
      setDescription('');
      setUploadedFiles([]);
      setFileName('파일 선택');
    } else {
      alert('시작 시간과 종료 시간을 입력하세요.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(files);
    if (files.length > 0) {
      setFileName(files.map((file) => file.name).join(', '));
    }
    console.log('선택한 파일:', files);
  };

  const handleDelete = async (index: number) => {
    const deletedRecord = overtimeRecords[index];

    // 로컬 상태에서 삭제
    setLocalOvertimeRecords((prevRecords) =>
      prevRecords.filter((_, i) => i !== index)
    );
    const updatedRecords = overtimeRecords.filter((_, i) => i !== index);

    // 파일 삭제
    if (deletedRecord.filePath) {
      const filePaths = deletedRecord.filePath.split(', ');
      await Promise.all(
        filePaths.map(async (filePath) => {
          const path = filePath.trim();
          return deleteFile(path);
        })
      );
    }

    // 총 시간 업데이트
    const newTotal = Math.max(0, overtimeTotal - deletedRecord.hours);
    setOvertimeRecords(updatedRecords);
    setOvertimeTotal(newTotal);
    onOvertimeUpdate(newTotal);
    console.log(
      `삭제된 항목 인덱스: ${index}, 삭제된 시간: ${deletedRecord.hours}`
    );
  };

  return (
    <S.ApplyMiddleContainer>
      <S.ApplyTitleContainer>
        <S.ApplyMiddleRow>
          <div className="title">초과 근무 시작 시간</div>
          <div className="title">근무 종료 시각</div>
          <div className="title">초과 근무 시간</div>
          <div className="description">설명</div>
          <div className="title">첨부파일</div>
          <div className="title">항목 추가/삭제</div>
        </S.ApplyMiddleRow>
      </S.ApplyTitleContainer>
      <S.ApplyItemContainer>
        <S.ApplyMiddleRow>
          <input
            type="datetime-local"
            className="input"
            value={overtimeStart}
            onChange={(e) => setOvertimeStart(e.target.value)}
          />
          <input
            type="datetime-local"
            className="input"
            value={overtimeEnd}
            onChange={(e) => setOvertimeEnd(e.target.value)}
          />
          <input
            type="text"
            className="time"
            value={
              overtimeStart && overtimeEnd
                ? formatOvertimeTotal(
                    Math.abs(
                      (new Date(overtimeEnd).getTime() -
                        new Date(overtimeStart).getTime()) /
                        36e5
                    )
                  )
                : '0시간 0분'
            }
            readOnly
          />
          <input
            type="text"
            className="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="설명"
          />

          <button
            className="attach__button"
            onClick={() => fileInputRef.current?.click()}
          >
            {fileName}
          </button>
          <input
            type="file"
            className="upload"
            multiple
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <button className="button" onClick={handleAdd} disabled={isLoading}>
            {isLoading ? '저장 중...' : '추가'}
          </button>
        </S.ApplyMiddleRow>
        <S.RecordList>
          {overtimeRecords.map((record, index) => (
            <S.RecordItem key={index}>
              <input
                type="text"
                value={formatDate(new Date(record.start))}
                readOnly
                className="input"
              />
              <input
                type="text"
                value={formatDate(new Date(record.end))}
                readOnly
                className="input"
              />
              <input
                type="text"
                value={formatOvertimeTotal(record.hours)}
                readOnly
                className="time"
              />
              <input
                type="text"
                value={record.description}
                readOnly
                className="description"
              />
              <input
                type="text"
                value={
                  record.filePath && record.filePath.split(', ').length > 0
                    ? getFilteredFileNames(record.filePath.split(', '))
                    : '파일 없음'
                }
                readOnly
                className="input"
              />

              <button className="button" onClick={() => handleDelete(index)}>
                삭제
              </button>
            </S.RecordItem>
          ))}
        </S.RecordList>
      </S.ApplyItemContainer>
    </S.ApplyMiddleContainer>
  );
};

const S = {
  ApplyMiddleContainer: styled.div`
    width: 100%;
    min-height: 25vh;
    border-bottom: 2px solid ${colors.semantic.border};
  `,
  ApplyTitleContainer: styled.div`
    font-size: 20px;
    font-weight: bold;
    max-height: 40%;
    border: 2px solid ${colors.semantic.border};
    display: flex;
    padding: 15px;
    align-items: center;
    justify-content: center;

    .title {
      max-width: 30%;
      display: flex;
      justify-content: center;
      margin-left: 2vw;
      margin-right: 2vw;
    }
    .description {
      max-width: 30%;
      margin-left: 6vw;
      margin-right: 9vw;
      display: flex;
      justify-content: center;
    }
  `,

  ApplyItemContainer: styled.div`
    padding: 20px;
    overflow-y: auto;
    min-height: 25vh;
    max-height: 25vh;
    margin-bottom: 1.5vh;
    .input {
      max-width: 15%;
      height: 5vh;
      margin-right: 2.3vw;
      border: 1px solid ${colors.semantic.border};
      border-radius: 8px;
      margin-bottom: 1.5vh;
      background-color: ${colors.semantic.background.light};
    }
    .description {
      min-width: 10vw;
      height: 5vh;
      border-radius: 8px;
      margin-right: 2vw;
      border: 1px solid ${colors.semantic.border};
      margin-bottom: 1.5vh;
      background-color: ${colors.semantic.background.light};
    }
    .time {
      max-width: 5vw;
      height: 5vh;
      border-radius: 8px;
      margin-right: 5vw;
      border: 1px solid ${colors.semantic.border};
      margin-bottom: 1.5vh;
      background-color: ${colors.semantic.background.light};
    }
    .button {
      min-width: 7%;
      max-width: 7%;
      height: 5vh;
      background-color: ${colors.semantic.background.dark};
      color: white;
      border: none;
      cursor: pointer;
      margin-bottom: 1.5vh;
      margin-right: 2vw;
      border-radius: 8px;
      &:hover {
        background-color: ${colors.semantic.hover.secondary};
        color: ${colors.semantic.text.dark};
      }
      border-radius: 8px;
      &:hover {
        background-color: ${colors.semantic.hover.secondary};
        color: ${colors.semantic.text.dark};
      }
    }

    .attach__button {
      min-width: 15%;
      max-width: 15%;
      height: 5vh;
      background-color: ${colors.semantic.background.dark};
      color: white;
      border: none;
      cursor: pointer;
      margin-bottom: 1.5vh;
      margin-right: 2vw;
      border-radius: 8px;
      &:hover {
        background-color: ${colors.semantic.hover.secondary};
        color: ${colors.semantic.text.dark};
      }
      border-radius: 8px;
      &:hover {
        background-color: ${colors.semantic.hover.secondary};
        color: ${colors.semantic.text.dark};
      }
    }
  `,
  ApplyMiddleRow: styled.div`
    display: flex;
    justify-content: row;
    align-items: center;
  `,
  RecordList: styled.div`
    margin-top: 10px;
  `,
  RecordItem: styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  `,
};
export default ApplyMiddle;
