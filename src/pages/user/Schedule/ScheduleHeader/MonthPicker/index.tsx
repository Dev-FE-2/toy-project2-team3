import styled from 'styled-components';

const StyledWrapper = styled.div`
  width: 15rem;
  height: 1rem;
  padding: 0.75rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    cursor: pointer;
  }
`;

const MonthPicker = () => {
  return (
    <StyledWrapper>
      <div className="material-symbols-outlined">chevron_left</div>
      <div>2024 Dec</div>
      <div className="material-symbols-outlined">chevron_right</div>
    </StyledWrapper>
  );
};

export default MonthPicker;
