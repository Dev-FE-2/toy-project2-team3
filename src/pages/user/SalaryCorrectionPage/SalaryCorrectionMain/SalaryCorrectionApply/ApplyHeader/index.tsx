import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../../../../../../styles';
import { fetchDataFromDB } from '../../../../../../firebase';
import type { Attendance } from '../../../../../../types/interface';
import { useFetchUserInfo } from '../../../../../../hooks';

const ApplyHeader = () => {
  const today = new Date();
  const initialMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;

  const [selectedMonth, setSelectedMonth] = useState<string>(initialMonth);
  const [attendanceData, setAttendanceData] = useState<Attendance[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [totalWorkingHours, setTotalWorkingHours] = useState<number>(0);
  const [monthlySalary, setMonthlySalary] = useState<number>(0);
  const [baseSalary, setBaseSalary] = useState<number>(2000000);
  const [baseWorkingHours, setBaseWorkingHours] = useState<number>(174);
  const [overtimeSalary, setOvertimeSalary] = useState<number>(0);
  const [overtimeHours, setOvertimeHours] = useState<string>('0시간 0분');
  const [nightPay, setNightPay] = useState<number>(0);
  const [nightWorkingHours, setNightWorkingHours] =
    useState<string>('0시간 0분');

  const { userInfo } = useFetchUserInfo();

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        setLoading(true);
        const data = await fetchDataFromDB<Attendance>({
          table: 'Attendance',
          key: userInfo?.userId,
        });

        if (data) {
          setAttendanceData(data);
          calculateValues(data);
        } else {
          resetValues();
          setError('근태 기록이 존재하지 않습니다.');
        }
      } catch (err) {
        console.log(err);
        setError('근태 기록을 가져오는 중 오류가 발생했습니다.');
        resetValues();
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, [selectedMonth]);

  const resetValues = () => {
    setTotalWorkingHours(0);
    setMonthlySalary(0);
    setBaseSalary(0);
    setBaseWorkingHours(0);
    setOvertimeSalary(0);
    setNightPay(0);
    setNightWorkingHours('0시간 0분');
    setOvertimeHours('0시간 0분');
  };

  const formatOvertimeHours = (hours: number): string => {
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    return `${wholeHours}시간 ${minutes}분`;
  };

  const calculateValues = (data: Attendance[]) => {
    const filteredData = data.filter((attendance) => {
      const month = new Date(attendance.checkInTime).toISOString().slice(0, 7);
      return month === selectedMonth;
    });

    const totalHours = filteredData.reduce((acc, attendance) => {
      const hours = parseInt(attendance.workingTime.split(':')[0], 10);
      return acc + hours;
    }, 0);

    setTotalWorkingHours(totalHours);

    if (filteredData.length > 0) {
      setBaseSalary(2000000);
    } else {
      setBaseSalary(0);
    }

    const nightHours = filteredData.reduce((acc, attendance) => {
      const nightHours = parseInt(
        attendance.nightWorkingTime.split(':')[0],
        10
      );
      return acc + nightHours;
    }, 0);

    const nightPayAmount = nightHours * 20000;

    setNightWorkingHours(formatOvertimeHours(nightHours));
    setNightPay(nightPayAmount);

    const totalOvertimeHours = filteredData.reduce((acc, attendance) => {
      const overtimeTime = attendance.overWorkingTime;
      const [hours, minutes] = overtimeTime.split(':').map(Number);
      return acc + hours + minutes / 60;
    }, 0);

    const overtimePay = totalOvertimeHours * 15000;

    setOvertimeHours(formatOvertimeHours(totalOvertimeHours));
    setOvertimeSalary(overtimePay);

    const totalSalary = 2000000 + overtimePay + nightPayAmount;
    setMonthlySalary(totalSalary);

    if (totalHours === 0) {
      resetValues();
      setError('급여 내역이 존재하지 않습니다.');
    } else {
      setError(null);
    }
  };

  return (
    <S.ApplyHeaderContainer>
      <S.ApplyHeaderRow>
        <div className="key">정정 신청 급여 월</div>
        <div className="key">월 근무 시간</div>
        <div className="key">월 급여</div>
        <div className="key">기본 급여</div>
        <div className="key">기본 근무 시간</div>
        <div className="key">연장 수당</div>
        <div className="key">연장 근무 시간</div>
        <div className="key">야근 수당</div>
        <div className="key">야간 근무 시간</div>
      </S.ApplyHeaderRow>
      <S.ApplyHeaderRow>
        <input
          type="month"
          className="calendar"
          value={selectedMonth}
          onChange={(e) => {
            setSelectedMonth(e.target.value);
            // 월 변경 시 데이터 재계산
            if (attendanceData) {
              calculateValues(attendanceData);
            }
          }}
        />
        <div className="input">{totalWorkingHours}시간</div>
        <div className="input">{monthlySalary.toLocaleString()}원</div>
        <div className="input">{baseSalary.toLocaleString()}원</div>
        <div className="input">{baseWorkingHours}</div>
        <div className="input">{overtimeSalary.toLocaleString()}원</div>
        <div className="input">{overtimeHours}</div>
        <div className="input">{nightPay.toLocaleString()}원</div>
        <div className="input">{nightWorkingHours}</div>
      </S.ApplyHeaderRow>
      <div className="key">월 근태 내역</div>
      <S.ApplyAttendanceList>
        {loading ? (
          <S.NoRecordMessage>로딩 중...</S.NoRecordMessage>
        ) : error ? (
          <S.NoRecordMessage>{error}</S.NoRecordMessage>
        ) : attendanceData &&
          Array.isArray(attendanceData) &&
          attendanceData.length > 0 ? (
          attendanceData.map((attendance) => {
            const month = new Date(attendance.checkInTime)
              .toISOString()
              .slice(0, 7);
            if (month === selectedMonth) {
              const checkInTime = new Date(
                attendance.checkInTime
              ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              const checkOutTime = new Date(
                attendance.checkOutTime
              ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

              return (
                <S.AttendanceItem key={attendance.checkInTime}>
                  <div className="date">
                    {attendance.checkInTime.slice(0, 10)}
                  </div>
                  <div className="time">
                    {checkInTime} - {checkOutTime}
                  </div>
                  <div className="date">
                    총 근무 시간: {attendance.workingTime}
                  </div>
                  <div className="date">
                    야근 시간: {attendance.nightWorkingTime}
                  </div>
                  <div className="date">
                    초과 근무 시간: {attendance.overWorkingTime}
                  </div>
                </S.AttendanceItem>
              );
            }
            return null;
          })
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
    min-height: 6vh;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid ${colors.semantic.border.light};

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
