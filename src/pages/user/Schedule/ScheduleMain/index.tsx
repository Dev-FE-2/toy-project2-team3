import styled from 'styled-components';
import MainCalendar from './MainCalendar';

const ScheduleMain = () => {
  return (
    <StyledWrapper>
      <MainCalendar />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: calc(75rem + 2px);
  height: calc(80dvh - 50px);
`;

export default ScheduleMain;
