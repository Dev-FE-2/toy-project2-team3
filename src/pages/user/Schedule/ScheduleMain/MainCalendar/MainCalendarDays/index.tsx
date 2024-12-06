import styled from 'styled-components';
import { colors } from '../../../../../../styles/token/colors';
import { border } from '../../../../../../styles';

interface MainCalendarDaysProps {
  day: number;
  isCurrentMonth: boolean;
}

const MainCalendarDays = ({ day, isCurrentMonth }: MainCalendarDaysProps) => {
  return (
    <S.MainCalendarDaysWrapper isCurrentMonth={isCurrentMonth}>
      <S.MainCalendarDaysNumber>{day}</S.MainCalendarDaysNumber>
      <S.MainCalendarDaysContentsWrapper>
        <S.MainCalendarDaysContents>
          누구의 어떤 일정입니다
        </S.MainCalendarDaysContents>
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
  MainCalendarDaysContents: styled.div`
    width: calc(100% - 0.5rem - 2px);
    min-height: 1rem;
    font-size: 0.875rem;
    border: ${border.default};
    border-radius: ${border.radius.xs};
    padding: 0.125rem 0.25rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
};

export default MainCalendarDays;
