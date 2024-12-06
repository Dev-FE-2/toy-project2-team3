import styled from 'styled-components';
import MainCalendar from './MainCalendar';

interface ScheduleMainProps {
  currentMonth: number;
  currentYear: number;
}

const ScheduleMain = ({ currentMonth, currentYear }: ScheduleMainProps) => {
  return (
    <S.Wrapper>
      <MainCalendar currentYear={currentYear} currentMonth={currentMonth} />
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    width: calc(75rem + 2px);
    height: calc(80dvh - 50px);
  `,
};

export default ScheduleMain;
