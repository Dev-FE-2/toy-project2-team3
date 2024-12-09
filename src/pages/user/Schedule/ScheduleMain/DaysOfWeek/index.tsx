import styled from 'styled-components';
import { border } from '../../../../../styles';

interface DaysOfWeekProps {
  day: string;
}

const DaysOfWeek = ({ day }: DaysOfWeekProps) => {
  return <S.DayWrapper>{day}</S.DayWrapper>;
};

const S = {
  DayWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: ${border.default};
  `,
};

export default DaysOfWeek;
