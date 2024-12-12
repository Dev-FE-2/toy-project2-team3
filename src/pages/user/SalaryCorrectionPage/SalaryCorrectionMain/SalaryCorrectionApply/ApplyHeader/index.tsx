import { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../../../../../styles';

type Attendance = {
  date: string;
  workInTime: string;
  workOutTime: string;
};

const attendanceHistory: Attendance[] = [
  {
    workInTime: '09:00',
    workOutTime: '17:00',
    date: '2024-11-01',
  },
  {
    workInTime: '09:00',
    workOutTime: '17:00',
    date: '2024-11-01',
  },
  {
    workInTime: '09:00',
    workOutTime: '17:00',
    date: '2024-12-01',
  },
  {
    workInTime: '10:00',
    workOutTime: '18:00',
    date: '2024-12-02',
  },
  {
    workInTime: '10:00',
    workOutTime: '18:00',
    date: '2024-12-02',
  },
  {
    workInTime: '10:00',
    workOutTime: '18:00',
    date: '2024-12-02',
  },
  {
    workInTime: '10:00',
    workOutTime: '18:00',
    date: '2024-12-02',
  },
  {
    workInTime: '10:00',
    workOutTime: '18:00',
    date: '2024-12-02',
  },
  {
    workInTime: '10:00',
    workOutTime: '18:00',
    date: '2024-12-02',
  },
  {
    workInTime: '10:00',
    workOutTime: '18:00',
    date: '2024-12-02',
  },
  {
    workInTime: '10:00',
    workOutTime: '18:00',
    date: '2024-12-02',
  },
  {
    workInTime: '10:00',
    workOutTime: '18:00',
    date: '2024-12-02',
  },
  {
    workInTime: '10:00',
    workOutTime: '18:00',
    date: '2024-12-02',
  },
];

const ApplyHeader = () => {
  const today = new Date();
  const initialMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`; // YYYY-MM 형식으로 변환
  const [selectedMonth, setSelectedMonth] = useState<string>(initialMonth);

  const filteredAttendance = attendanceHistory.filter((attendance) =>
    attendance.date.startsWith(selectedMonth)
  );

  return (
    <S.ApplyHeaderContainer>
      <S.ApplyHeaderRow>
        <div className="key">정정 신청 급여 월</div>
        <div className="key">월 근무 시간</div>
        <div className="key">월 급여</div>
        <div className="key">기본 급여</div>
        <div className="key">기본 근무 시간</div>
        <div className="key">연장 근무</div>
        <div className="key">연장 근무 시간</div>
        <div className="key">야근 수당</div>
        <div className="key">야간 근무 시간</div>
      </S.ApplyHeaderRow>
      <S.ApplyHeaderRow>
        <input
          type="month"
          className="calendar"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        />
        <div className="input">160시간</div>
        <div className="input">3,000,000</div>
        <div className="input">2,000,000</div>
        <div className="input">160시간</div>
        <div className="input">1,000,000</div>
        <div className="input">20시간</div>
        <div className="input">0</div>
        <div className="input">0시간</div>
      </S.ApplyHeaderRow>
      <div className="key">월 근태 내역</div>
      <S.ApplyAttendanceList>
        {filteredAttendance.length > 0 ? (
          filteredAttendance.map((attendance, index) => (
            <S.AttendanceItem key={index}>
              <div className="date">{attendance.date}</div>
              <div className="time">
                {attendance.workInTime} - {attendance.workOutTime}
              </div>
            </S.AttendanceItem>
          ))
        ) : (
          <S.NoRecordMessage>근태 기록이 존재하지 않습니다.</S.NoRecordMessage>
        )}
      </S.ApplyAttendanceList>
      <div className="key">근태 정정 항목</div>
    </S.ApplyHeaderContainer>
  );
};

const S = {
  ApplyHeaderContainer: styled.div`
    width: 100%;
    min-height: 15%;
    display: flex;
    flex-direction: column;

    .key {
      min-width: 10%;
      font-weight: bold;
      margin-right: 0.9vw;
      margin-bottom: 2vh;
    }

    .calendar {
      min-width: 0.5vw;
      min-height: 5vh;
      background-color: ${colors.semantic.background.light};
      margin-right: 0vw;
      border: none;
      margin-bottom: 2vh;
    }

    .input {
      padding: 10px;
      min-width: 9%;
      min-height: 4vh;
      background-color: ${colors.semantic.background.light};
      display: flex;
      justify-content: left;
      align-items: center;
      margin-left: 1.5vw;
      margin-bottom: 2vh;
    }
  `,

  ApplyAttendanceList: styled.div`
    flex-grow: 1;
    min-height: 15vh;
    max-height: 15vh;
    background-color: ${colors.semantic.background.light};
    overflow-y: auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-bottom: 2vh;
  `,

  AttendanceItem: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid ${colors.semantic.border};

    .date {
      flex: 1;
    }
    .time {
      flex: 1;
    }
  `,

  NoRecordMessage: styled.div`
    color: ${colors.semantic.text.gray};
    padding: 10px;
    margin: auto;
  `,

  ApplyHeaderRow: styled.div`
    display: flex;
    flex-direction: row;
  `,
};

export default ApplyHeader;
