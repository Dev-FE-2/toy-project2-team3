import styled from 'styled-components';
import MainCalendar from './MainCalendar';
import DaysOfWeek from './DaysOfWeek';

interface ScheduleMainProps {
  currentMonth: number;
  currentYear: number;
  setIsSixWeek: (prop: boolean) => void;
}

const ScheduleMain = ({
  currentMonth,
  currentYear,
  setIsSixWeek,
}: ScheduleMainProps) => {
  const DAYS_OF_WEEK_LIST = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <>
      <S.DaysOfWeekWrapper>
        {DAYS_OF_WEEK_LIST.map((day, index) => (
          <DaysOfWeek key={index} day={day} />
        ))}
      </S.DaysOfWeekWrapper>
      <S.CalendarWrapper>
        <MainCalendar
          currentYear={currentYear}
          currentMonth={currentMonth}
          setIsSixWeek={setIsSixWeek}
        />
      </S.CalendarWrapper>
    </>
  );
};

const S = {
  CalendarWrapper: styled.div`
    width: 1250px;
    height: calc(80% - 5rem);
  `,
  DaysOfWeekWrapper: styled.div`
    width: 1250px;
    height: 2rem;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  `,
};

export default ScheduleMain;
