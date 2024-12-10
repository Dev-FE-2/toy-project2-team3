import styled from 'styled-components';
import { colors, border } from '../../../../../../../styles';
import MainCalendarDaysSchedules from './MainCalendarDaysSchedules';

interface TeamMembersData {
  name: string;
  userId: string;
}

interface CurrentSchedule {
  type: string;
  teamId: TeamMembersData[];
  userId?: string;
}

interface MainCalendarDaysProps {
  currentSchedule: CurrentSchedule;
  day: number;
  isCurrentMonth: boolean;
  setIsDayClick: (prop: boolean) => void;
}

const MainCalendarDays = ({
  currentSchedule,
  day,
  isCurrentMonth,
  setIsDayClick,
}: MainCalendarDaysProps) => {
  const handleDayClick = () => {
    setIsDayClick(true);
  };

  return (
    <S.MainCalendarDaysWrapper
      onClick={handleDayClick}
      isCurrentMonth={isCurrentMonth}
    >
      <S.MainCalendarDaysNumber>{day}</S.MainCalendarDaysNumber>
      <S.MainCalendarDaysContentsWrapper>
        <MainCalendarDaysSchedules currentSchedule={currentSchedule} />
      </S.MainCalendarDaysContentsWrapper>
    </S.MainCalendarDaysWrapper>
  );
};

const S = {
  MainCalendarDaysWrapper: styled.div<{ isCurrentMonth: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    background-color: white;
    color: ${({ isCurrentMonth }) =>
      isCurrentMonth ? colors.semantic.dark : colors.semantic.disabled};
    border: ${border.default};
    padding-bottom: 0.5rem;
    position: relative;
    overflow: hidden;
    cursor: ${({ isCurrentMonth }) =>
      isCurrentMonth ? 'pointer' : 'not-allowed'};
    &:hover {
      background-color: ${({ isCurrentMonth }) =>
        isCurrentMonth ? colors.semantic.hover.primary : colors.semantic.light};
    }
  `,
  MainCalendarDaysNumber: styled.div`
    position: absolute;
    top: 5%;
    left: 5%;
  `,
  MainCalendarDaysContentsWrapper: styled.div`
    width: 80%;
    max-height: calc(1.375rem * 4 + 0.25rem * 3);
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    overflow: hidden;
  `,
};

export default MainCalendarDays;
