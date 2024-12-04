import styled from 'styled-components';
import MonthPicker from './MonthPicker';

const ScheduleHeader = () => {
  return (
    <StyledHeader>
      <MonthPicker />
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  width: 75rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 0 0.5rem 0 0;
`;

export default ScheduleHeader;
