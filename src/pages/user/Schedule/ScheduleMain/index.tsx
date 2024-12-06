import styled from 'styled-components';
import MainCalendar from './MainCalendar';

interface ScheduleMainProps {
  currentMonth: number;
  currentYear: number;
  setIsSixWeek: (prop: boolean) => void;
}

const ScheduleMain = ({
  currentMonth,
  currentYear,
  setIsSixWeek,
}: ScheduleMainProps) => {
  return (
    <S.Wrapper>
      <MainCalendar
        currentYear={currentYear}
        currentMonth={currentMonth}
        setIsSixWeek={setIsSixWeek}
      />
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    width: 1250px;
    height: calc(80% - 3rem);
  `,
};

export default ScheduleMain;
