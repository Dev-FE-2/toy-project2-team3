import styled from "styled-components"

const StyledWrapper = styled.div`
  width: 15rem;
  height: 1rem;
  padding: .75rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  div {
    cursor: pointer;
  }
`

const MonthPicker = () => {
  return (
    <StyledWrapper>
        <div><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#333"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg></div>
        <div>2024 Dec</div>
        <div><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#333"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg></div>
    </StyledWrapper>
  )
}

export default MonthPicker