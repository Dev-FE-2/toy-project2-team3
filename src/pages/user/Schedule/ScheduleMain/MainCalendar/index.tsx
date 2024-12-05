import styled from 'styled-components';
import MainCalendarDays from './MainCalendarDays';

interface MainCalendarProps {
  currentYear: number;
  currentMonth: number;
}

const MainCalendar = ({ currentYear, currentMonth }: MainCalendarProps) => {
  const FIRST_DAY_OF_MONTH = new Date(currentYear, currentMonth - 1, 1);
  const LAST_DAY_OF_MONTH = new Date(currentYear, currentMonth, 0);
  const TOTAL_DAYS = LAST_DAY_OF_MONTH.getDate();

  const START_DAY_OF_WEEK = FIRST_DAY_OF_MONTH.getDay();
  const LAST_DAY_OF_PREV_MONTH = new Date(
    currentYear,
    currentMonth - 1,
    0
  ).getDate();
  const PREV_MONTH_DAYS = Array.from(
    { length: START_DAY_OF_WEEK },
    (_, i) => LAST_DAY_OF_PREV_MONTH - START_DAY_OF_WEEK + i + 1
  );

  const CURRENT_MONTH_DAYS = Array.from(
    { length: TOTAL_DAYS },
    (_, i) => i + 1
  );

  const TOTAL_DISPLAYED_DAYS =
    PREV_MONTH_DAYS.length + CURRENT_MONTH_DAYS.length > 35 ? 42 : 35;
  const NEXT_MONTH_DAYS = Array.from(
    {
      length:
        TOTAL_DISPLAYED_DAYS -
        (PREV_MONTH_DAYS.length + CURRENT_MONTH_DAYS.length),
    },
    (_, i) => i + 1
  );

  const ALL_DAYS = [
    ...PREV_MONTH_DAYS,
    ...CURRENT_MONTH_DAYS,
    ...NEXT_MONTH_DAYS,
  ];

  console.log(ALL_DAYS.length);
  console.log(PREV_MONTH_DAYS);
  console.log(CURRENT_MONTH_DAYS);
  console.log(NEXT_MONTH_DAYS);

  return (
    <StyledMainCalendarWrapper daysCount={ALL_DAYS.length}>
      {ALL_DAYS.map((day, index) => (
        <MainCalendarDays
          key={index}
          day={day}
          isCurrentMonth={
            index >= PREV_MONTH_DAYS.length &&
            index < PREV_MONTH_DAYS.length + CURRENT_MONTH_DAYS.length
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
