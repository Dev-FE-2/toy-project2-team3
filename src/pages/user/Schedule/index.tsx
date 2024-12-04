import styled from 'styled-components';
import ScheduleHeader from './ScheduleHeader';
import ScheduleMain from './ScheduleMain';
import ScheduleSideBar from './ScheduleSideBar';
import TempScheduleCreator from './TempScheduleCreator';

const Schedule = () => {
  return (
    <>
      <StyledWrapper>
        <ScheduleSideBar />
        <div>
          <ScheduleHeader />
          <ScheduleMain />
        </div>
      </StyledWrapper>
      <TempScheduleCreator />
    </>
  );
};

const StyledWrapper = styled.div`
  display: flex;
`;

export default Schedule;
