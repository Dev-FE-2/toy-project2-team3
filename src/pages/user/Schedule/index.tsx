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
  const [isSixWeek, setIsSixWeek] = useState(false)

  const handleYearMonthChange = (year: number, month: number) => {
    setCurrentYear(year);
    setCurrentMonth(month);
  };

  return (
    <>
      <S.Wrapper>
        <ScheduleSideBar isSixWeek={isSixWeek} />
        <div>
          <ScheduleHeader
            currentMonth={currentMonth}
            currentYear={currentYear}
            handleYearMonthChange={handleYearMonthChange}
          />
          <ScheduleMain currentMonth={currentMonth} currentYear={currentYear} setIsSixWeek={setIsSixWeek} />
        </div>
      </S.Wrapper>
    </>
  );
};

const S = {
  Wrapper: styled.div`
  display: flex;
`
}

export default Schedule;
