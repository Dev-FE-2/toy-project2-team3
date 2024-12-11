import styled from 'styled-components';
import { colors, border, padding } from '../../../../../../../styles';
import MainCalendarDaysSchedules from './MainCalendarDaysSchedules';
import { SetStateAction } from 'react';

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
  currentYear: number;
  currentMonth: number;
  day: number;
  isCurrentMonth: boolean;
  setIsDayClick: (prop: boolean) => void;
  setClickedDate: React.Dispatch<SetStateAction<number[]>>;
}

const MainCalendarDays = ({
  currentSchedule,
  currentYear,
  currentMonth,
  day,
  isCurrentMonth,
  setIsDayClick,
  setClickedDate,
}: MainCalendarDaysProps) => {
  const handleDayClick = () => {
    let adjustedYear = currentYear;
    let adjustedMonth = currentMonth;
    const adjustedDay = day;

    if (!isCurrentMonth && day > 20) {
      adjustedMonth -= 1;
      if (adjustedMonth < 1) {
        adjustedMonth = 12;
        adjustedYear -= 1;
      }
    } else if (!isCurrentMonth && day <= 20) {
      adjustedMonth += 1;
      if (adjustedMonth > 12) {
        adjustedMonth = 1;
        adjustedYear += 1;
      }
    }

    setClickedDate([adjustedYear, adjustedMonth, adjustedDay]);
    setIsDayClick(true);
  };

  return (
    <S.MainCalendarDaysWrapper
      onClick={handleDayClick}
      isCurrentMonth={isCurrentMonth}
    >
      <S.MainCalendarDaysNumber>{day}</S.MainCalendarDaysNumber>
      <S.MainCalendarDaysContentsWrapper>
        <MainCalendarDaysSchedules
          currentSchedule={currentSchedule}
          currentYear={currentYear}
          currentMonth={currentMonth}
          day={day}
        />
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
    padding-bottom: ${padding.sm};
    position: relative;
    overflow: hidden;
    cursor: pointer;
    &:hover {
      background-color: ${({ isCurrentMonth }) =>
        isCurrentMonth
          ? colors.semantic.hover.primary
          : colors.scale.neutral.s95};
    }
  `,
  MainCalendarDaysNumber: styled.div`
    position: absolute;
    top: 5%;
    left: 5%;
  `,
  MainCalendarDaysContentsWrapper: styled.div`
    width: 80%;
    max-height: calc(21px * 4 + 3px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1px;
    overflow: hidden;
  `,
};

export default MainCalendarDays;
