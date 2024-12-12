import styled from 'styled-components';
import ScheduleHeader from './ScheduleHeader';
import ScheduleMain from './ScheduleMain';
import ScheduleSideBar from './ScheduleSideBar';
import { useState } from 'react';

const Schedule = () => {
  const CURRENT_MONTH = new Date().getMonth() + 1;
  const CURRENT_YEAR = new Date().getFullYear();
  const [currentMonth, setCurrentMonth] = useState(CURRENT_MONTH);
  const [currentYear, setCurrentYear] = useState(CURRENT_YEAR);
  const [isSixWeek, setIsSixWeek] = useState(false);
  const [isDayClick, setIsDayClick] = useState(false);

  const handleYearMonthChange = (year: number, month: number) => {
    setCurrentYear(year);
    setCurrentMonth(month);
  };

  return (
    <>
      <S.Wrapper>
        <ScheduleSideBar isSixWeek={isSixWeek} isDayClick={isDayClick} />
        <div>
          <ScheduleHeader
            currentMonth={currentMonth}
            currentYear={currentYear}
            isDayClick={isDayClick}
            handleYearMonthChange={handleYearMonthChange}
            setIsDayClick={setIsDayClick}
          />
          <ScheduleMain
            currentMonth={currentMonth}
            currentYear={currentYear}
            isDayClick={isDayClick}
            setIsSixWeek={setIsSixWeek}
            setIsDayClick={setIsDayClick}
          />
        </div>
      </S.Wrapper>
    </>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    width: 1440px;
    height: 100dvh;
  `,
};

export default Schedule;
