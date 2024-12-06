import styled from 'styled-components';
import MainCalendarDays from './MainCalendarDays';

interface MainCalendarProps {
  currentYear: number;
  currentMonth: number;
}

const MainCalendar = ({ currentYear, currentMonth }: MainCalendarProps) => {
  const FIRST_DAY_OF_MONTH = new Date(currentYear, currentMonth - 1, 1);
  const LAST_DAY_OF_MONTH = new Date(currentYear, currentMonth, 0);
  const totalDays = LAST_DAY_OF_MONTH.getDate();

  const startDayOfWeek = FIRST_DAY_OF_MONTH.getDay();
  const lastDayOfPrevMonth = new Date(
    currentYear,
    currentMonth - 1,
    0
  ).getDate();
  const prevMonthDays = Array.from(
    { length: startDayOfWeek },
    (_, i) => lastDayOfPrevMonth - startDayOfWeek + i + 1
  );

  const currentMonthDays = Array.from({ length: totalDays }, (_, i) => i + 1);

  const TOTAL_DISPLAYED_DAYS =
    prevMonthDays.length + currentMonthDays.length > 35 ? 42 : 35;
  const nextMonthDays = Array.from(
    {
      length:
        TOTAL_DISPLAYED_DAYS - (prevMonthDays.length + currentMonthDays.length),
    },
    (_, i) => i + 1
  );

  const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

  console.log(allDays.length);
  console.log(prevMonthDays);
  console.log(currentMonthDays);
  console.log(nextMonthDays);

  return (
    <StyledMainCalendarWrapper daysCount={allDays.length}>
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
    </StyledMainCalendarWrapper>
  );
};

const StyledMainCalendarWrapper = styled.div<{ daysCount: number }>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: ${(prop) =>
    prop.daysCount > 35 ? 'repeat(6, 1fr)' : 'repeat(5, 1fr)'};
  width: 100%;
  height: ${(prop) => (prop.daysCount > 35 ? '120%' : '100%')};
  aspect-ratio: ${(prop) => (prop.daysCount > 35 ? '7 / 6' : '7 / 5')};
`;

export default MainCalendar;
