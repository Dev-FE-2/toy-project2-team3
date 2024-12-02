import styled from "styled-components";
import ScheduleHeader from "./ScheduleHeader";
import ScheduleMain from "./ScheduleMain";
import ScheduleSideBar from "./ScheduleSideBar";

const StyledWrapper = styled.div`
  display: flex;
`;

const StyledContent = styled.div``;

const Schedule = () => {
  return (
    <StyledWrapper>
      <ScheduleSideBar />
      <StyledContent>
        <ScheduleHeader />
        <ScheduleMain />
      </StyledContent>
    </StyledWrapper>
  );
};

export default Schedule;
