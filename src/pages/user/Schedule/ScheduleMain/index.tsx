import styled from 'styled-components';
import MainCalendar from './MainCalendar';

const ScheduleMain = () => {
  const CURRENT_YEAR = new Date().getFullYear();
  const CURRENT_MONTH = new Date().getMonth() + 1;

  return (
    <StyledWrapper>
      <MainCalendar year={CURRENT_YEAR} month={CURRENT_MONTH} />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: calc(75rem + 2px);
  height: calc(80dvh - 50px);
`;

export default ScheduleMain;
