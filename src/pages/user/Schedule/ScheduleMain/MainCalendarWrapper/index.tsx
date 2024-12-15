import styled from 'styled-components';
import MainCalendar from './MainCalendar';
import { border } from '../../../../../styles';
import { DAYS_OF_WEEK_LIST } from '../../constants';
import { SetStateAction } from 'react';

interface TeamMembersData {
  name: string;
  userId: string;
  number: number;
}

interface CurrentSchedule {
  type: string;
  teamId: TeamMembersData[];
  userId?: string;
}

interface MainCalendarWrapperProps {
  currentSchedule: CurrentSchedule;
  currentMonth: number;
  currentYear: number;
  setIsSixWeek: (prop: boolean) => void;
  setIsDayClick: (prop: boolean) => void;
  setClickedDate: React.Dispatch<SetStateAction<number[]>>;
}

const MainCalendarWrapper = ({
  currentSchedule,
  currentMonth,
  currentYear,
  setIsSixWeek,
  setIsDayClick,
  setClickedDate,
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
          currentSchedule={currentSchedule}
          currentYear={currentYear}
          currentMonth={currentMonth}
          setIsSixWeek={setIsSixWeek}
          setIsDayClick={setIsDayClick}
          setClickedDate={setClickedDate}
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
