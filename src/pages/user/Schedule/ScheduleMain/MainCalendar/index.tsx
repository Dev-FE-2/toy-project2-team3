import styled from 'styled-components';
import MainCalendarDays from './MainCalendarDays';

interface MainCalendarProps {
  year: number;
  month: number;
}

const MainCalendar = ({ year, month }: MainCalendarProps) => {
  const FIRST_DAY_OF_MONTH = new Date(year, month - 1, 1);
  const LAST_DAY_OF_MONTH = new Date(year, month, 0);
  const TOTAL_DAYS = LAST_DAY_OF_MONTH.getDate();

  const START_DAY_OF_WEEK = FIRST_DAY_OF_MONTH.getDay();
  const LAST_DAY_OF_PREV_MONTH = new Date(year, month - 1, 0).getDate();
  const PREV_MONTH_DAYS = Array.from(
    { length: START_DAY_OF_WEEK },
    (_, i) => LAST_DAY_OF_PREV_MONTH - START_DAY_OF_WEEK + i + 1
  );

  const CURRENT_MONTH_DAYS = Array.from(
    { length: TOTAL_DAYS },
    (_, i) => i + 1
  );

  const TOTAL_DISPLAYED_DAYS = 35;
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

  return (
    <StyledMainCalendarWrapper>
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

const StyledMainCalendarWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr); /* 가로 7칸 */
  grid-template-rows: repeat(5, 1fr); /* 세로 5칸 */
  width: 100%;
  height: 100%;
  aspect-ratio: 7 / 5;
`;

export default MainCalendar;
