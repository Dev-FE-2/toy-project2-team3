import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../../../../../styles';
import FileUploading from '../../../../../../components/FileUploading';

type OvertimeRecord = {
  start: string;
  end: string;
  hours: number;
  description: string;
  filePath?: string;
};

type MiddleProps = {
  onOvertimeUpdate: (newTotal: number) => void;
};

export const formatOvertimeTotal = (totalHours: number) => {
  const hours = Math.floor(totalHours);
  const minutes = Math.round((totalHours - hours) * 60);
  return `${hours}시간 ${minutes}분`;
};

const formatFileName = (fileName: string) => {
  return fileName.length > 7 ? `${fileName.slice(0, 7)}...` : fileName;
};

const ApplyMiddle: React.FC<MiddleProps> = ({ onOvertimeUpdate }) => {
  const [overtimeStart, setOvertimeStart] = useState('');
  const [overtimeEnd, setOvertimeEnd] = useState('');
  const [description, setDescription] = useState('');
  const [overtimeRecords, setOvertimeRecords] = useState<OvertimeRecord[]>([]);
  const [filePath, setFilePath] = useState('');

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? '오후' : '오전';
    hours = hours % 12;
    hours = hours ? String(hours).padStart(2, '0') : '12';
    return `${year}-${month}-${day} ${ampm} ${hours}:${minutes}`;
  };

  const handleAdd = () => {
    if (overtimeStart && overtimeEnd) {
      const start = new Date(overtimeStart);
      const end = new Date(overtimeEnd);
      if (start > end) {
        alert('종료시간이 시작 시간보다 빠를 순 없습니다.');
        return;
      }
      const hoursDiff = Math.abs(end.getTime() - start.getTime()) / 36e5; // 시간 차이 계산

      const newRecord: OvertimeRecord = {
        start: overtimeStart,
        end: overtimeEnd,
        hours: hoursDiff,
        description,
        filePath,
      };

      const newRecords = [...overtimeRecords, newRecord];
      setOvertimeRecords(newRecords);

      const totalHours = newRecords.reduce(
        (total, record) => total + record.hours,
        0
      );
      onOvertimeUpdate(totalHours);

      setOvertimeStart('');
      setOvertimeEnd('');
      setDescription('');
      setFilePath('');
    } else {
      alert('시작 시간과 종료 시간을 입력하세요.');
    }
  };

  const handleDelete = (index: number) => {
    const newRecords = overtimeRecords.filter((_, i) => i !== index);
    setOvertimeRecords(newRecords);

    const totalHours = newRecords.reduce(
      (total, record) => total + record.hours,
      0
    );
    onOvertimeUpdate(totalHours);
  };

  const handleFileUpload = (url: string) => {
    setFilePath(url);
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
          <FileUploading
            filePath={`overtime/${Date.now()}`}
            setUrl={handleFileUpload}
          />
          <button className="button" onClick={handleAdd}>
            추가
          </button>
        </S.ApplyMiddleRow>
        <S.RecordList>
          {overtimeRecords.map((record, index) => (
            <S.RecordItem key={index}>
              <input
                type="text"
                className="input"
                value={formatDateTime(record.start)}
                readOnly
              />
              <input
                type="text"
                className="input"
                value={formatDateTime(record.end)}
                readOnly
              />
              <input
                type="text"
                className="time"
                value={formatOvertimeTotal(record.hours)}
                readOnly
              />
              <input
                type="text"
                className="description"
                value={record.description}
                readOnly
              />
              <span>{formatFileName(record.filePath || '')}</span>
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
      javascript


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
    .attach {
      width: 9%;
      height: 5vh;
      background-color: ${colors.semantic.background.dark};
      color: white;
      border: none;
      cursor: pointer;
      margin-right: 5vw;
      margin-bottom: 1.5vh;
      margin-left: 3vw;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .button {
      min-width: 7%;
      height: 5vh;
      background-color: ${colors.semantic.background.dark};
      color: white;
      border: none;
      cursor: pointer;
      margin-bottom: 1.5vh;
      margin-right: 2vw;
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

    span {
      width: 9%;
      height: 5vh;
      background-color: ${colors.semantic.background.dark};
      color: white;
      border: none;
      cursor: pointer;
      margin-right: 5vw;
      margin-bottom: 1.5vh;
      margin-left: 3vw;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `,
};

export default ApplyMiddle;
