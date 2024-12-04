import styled from "styled-components";
import MainCalendar from "./MainCalendar";

const StyledWrapper = styled.div`
  width: calc(75rem + 2px);
  height: calc(80dvh - 50px);
`;

const ScheduleMain = () => {
  return (
    <StyledWrapper>
      <MainCalendar />
    </StyledWrapper>
  );
};

export default ScheduleMain;
