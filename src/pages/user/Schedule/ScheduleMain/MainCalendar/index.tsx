import styled from "styled-components"
import MainCalendarDays from "./MainCalendarDays"

const MainCalendarWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr); /* 가로 7칸 */
  grid-template-rows: repeat(5, 1fr); /* 세로 5칸 */
  width: 100%;
  height: 100%;
  aspect-ratio: 7 / 5;
`

const MainCalendar = () => {
  return (
    <MainCalendarWrapper>
      <MainCalendarDays />
      <MainCalendarDays />
      <MainCalendarDays />
      <MainCalendarDays />
      <MainCalendarDays />
      <MainCalendarDays />
      <MainCalendarDays />
      <MainCalendarDays />
      <MainCalendarDays />
      <MainCalendarDays />
      <MainCalendarDays />
      <MainCalendarDays />
      <MainCalendarDays />
      <MainCalendarDays />
      <MainCalendarDays />
      <MainCalendarDays />
      <MainCalendarDays />
      <MainCalendarDays />
      <MainCalendarDays />
      <MainCalendarDays />
      <MainCalendarDays />
      <MainCalendarDays />
      <MainCalendarDays />
      <MainCalendarDays />
      <MainCalendarDays />
      <MainCalendarDays />
      <MainCalendarDays />
      <MainCalendarDays />
      <MainCalendarDays />
      <MainCalendarDays />
      <MainCalendarDays />
      <MainCalendarDays />
      <MainCalendarDays />
      <MainCalendarDays />
      <MainCalendarDays />
    </MainCalendarWrapper>
  )
}

export default MainCalendar