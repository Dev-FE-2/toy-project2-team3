import styled from 'styled-components';
import MainCalendar from './MainCalendar';

interface ScheduleMainProps {
  currentMonth: number;
  currentYear: number;
}

const ScheduleMain = ({ currentMonth, currentYear }: ScheduleMainProps) => {
  return (
    <StyledWrapper>
      <MainCalendar currentYear={currentYear} currentMonth={currentMonth} />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: calc(75rem + 2px);
  height: calc(80dvh - 50px);
`;

export default ScheduleMain;
