import styled from 'styled-components';
import MainCalendar from './MainCalendar';
import { border } from '../../../../../styles';
import { DAYS_OF_WEEK_LIST } from '../../constants';

interface MainCalendarWrapperProps {
  currentMonth: number;
  currentYear: number;
  setIsSixWeek: (prop: boolean) => void;
  setIsDayClick: (prop: boolean) => void;
}

const MainCalendarWrapper = ({
  currentMonth,
  currentYear,
  setIsSixWeek,
  setIsDayClick,
}: MainCalendarWrapperProps) => {
  return (
    <>
      <S.DaysOfWeekWrapper>
        {DAYS_OF_WEEK_LIST.map((day, index) => (
          <S.DayWrapper key={index}>{day}</S.DayWrapper>
        ))}
      </S.DaysOfWeekWrapper>
      <S.CalendarWrapper>
        <MainCalendar
          currentYear={currentYear}
          currentMonth={currentMonth}
          setIsSixWeek={setIsSixWeek}
          setIsDayClick={setIsDayClick}
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
  DayWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: ${border.default};
  `,
};

export default MainCalendarWrapper;
