import styled from 'styled-components';
import { colors, border, padding } from '../../../../../../styles';
import MainCalendarDaysSchedules from './MainCalendarDaysSchedules';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../../../../state/store';
import {
  setClickedDate,
  setIsDayClick,
} from '../../../../../../slices/schedule/scheduleSlice';
import { calculateAdjustedDate } from '../../../../../../utils';

interface MainCalendarDaysProps {
  day: number;
  isCurrentMonth: boolean;
}

const MainCalendarDays = ({ day, isCurrentMonth }: MainCalendarDaysProps) => {
  const { currentMonth, currentYear } = useSelector(
    (state: RootState) => state.schedule
  );
  const dispatch = useDispatch();

  const handleDayClick = () => {
    const { adjustedYear, adjustedMonth } = calculateAdjustedDate(
      day,
      isCurrentMonth,
      currentMonth,
      currentYear
    );
    dispatch(setClickedDate([adjustedYear, adjustedMonth, day]));
    dispatch(setIsDayClick(true));
  };

  return (
    <S.MainCalendarDaysWrapper
      onClick={handleDayClick}
      isCurrentMonth={isCurrentMonth}
    >
      <S.MainCalendarDaysNumber>{day}</S.MainCalendarDaysNumber>
      <S.MainCalendarDaysContentsWrapper>
        <MainCalendarDaysSchedules day={day} isCurrentMonth={isCurrentMonth} />
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
          : colors.semantic.hover.secondary};
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
