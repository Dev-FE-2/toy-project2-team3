import styled from 'styled-components';
import MainCalendarDays from './MainCalendarDays';
import { border } from '../../../../../styles';
import { DAYS_OF_WEEK_LIST } from '../../../../../constant/schedule';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../../../state/store';
import { setIsSixWeek } from '../../../../../slices/schedule/scheduleSlice';

const MainCalendar = () => {
  const { currentMonth, currentYear } = useSelector(
    (state: RootState) => state.schedule
  );
  const dispatch = useDispatch();
  const calculateDays = (year: number, month: number) => {
    const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth, 0);
    const totalDays = lastDayOfMonth.getDate();
    const currentMonthDays = Array.from({ length: totalDays }, (_, i) => i + 1);

    const startDayOfWeek = firstDayOfMonth.getDay();
    const lastDayOfPrevMonth = new Date(year, month - 1, 0).getDate();
    const prevMonthDays = Array.from(
      { length: startDayOfWeek },
      (_, i) => lastDayOfPrevMonth - startDayOfWeek + i + 1
    );

    const TOTAL_DISPLAYED_DAYS =
      prevMonthDays.length + currentMonthDays.length > 35 ? 42 : 35;

    const nextMonthDays = Array.from(
      {
        length:
          TOTAL_DISPLAYED_DAYS -
          (prevMonthDays.length + currentMonthDays.length),
      },
      (_, i) => i + 1
    );

    return { prevMonthDays, currentMonthDays, nextMonthDays };
  };

  const { prevMonthDays, currentMonthDays, nextMonthDays } = calculateDays(
    currentYear,
    currentMonth
  );
  const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

  const isSixWeekCalendar = allDays.length > 35 ? 42 : 35;
  dispatch(setIsSixWeek(isSixWeekCalendar === 42));

  return (
    <>
      <S.DaysOfWeekWrapper>
        {DAYS_OF_WEEK_LIST.map((day, index) => (
          <S.DayWrapper key={index}>{day}</S.DayWrapper>
        ))}
      </S.DaysOfWeekWrapper>
      <S.CalendarWrapper>
        <S.MainCalendarWrapper daysCount={allDays.length}>
          {allDays.map((day, index) => (
            <MainCalendarDays
              key={index}
              day={day}
              isCurrentMonth={
                index >= prevMonthDays.length &&
                index < prevMonthDays.length + currentMonthDays.length
              }
            />
          ))}
        </S.MainCalendarWrapper>
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
  MainCalendarWrapper: styled.div<{ daysCount: number }>`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: ${(prop) =>
      prop.daysCount > 35 ? 'repeat(6, 1fr)' : 'repeat(5, 1fr)'};
    width: 100%;
    height: ${(prop) => (prop.daysCount > 35 ? '120.7%' : '100%')};
    aspect-ratio: ${(prop) => (prop.daysCount > 35 ? '7 / 6' : '7 / 5')};
  `,
};

export default MainCalendar;
