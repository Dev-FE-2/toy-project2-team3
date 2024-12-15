import styled from 'styled-components';
import { colors, border } from '../../../../../../styles';
import { MONTHS } from '../../../constants';

interface MonthPickerDetailProps {
  currentMonth: number;
  handleMonthClick: (clickedMonth: number) => void;
}

const MonthPickerDetail = ({
  currentMonth,
  handleMonthClick,
}: MonthPickerDetailProps) => {
  const MONTHS_ARRAY = Object.values(MONTHS);

  return (
    <S.Wrapper>
      <S.Month>
        {MONTHS_ARRAY.map((month, index) => (
          <S.MonthItemsWrapper key={month}>
            <S.MonthItems
              className={MONTHS[currentMonth] === month ? 'current-month' : ''}
              onClick={() => handleMonthClick(index)}
            >
              {month}
            </S.MonthItems>
          </S.MonthItemsWrapper>
        ))}
      </S.Month>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    border-bottom: ${border.default};
    border-left: ${border.default};
    border-right: ${border.default};
    border-radius: 0 0 ${border.radius.xs} ${border.radius.xs};
    background-color: ${colors.semantic.light};
    width: 15rem;
    position: absolute;
    top: 1.5rem;
    left: -1px;
    z-index: 3;
  `,
  Month: styled.div`
    display: grid !important;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
    width: 100%;
    aspect-ratio: 3 / 2;
  `,

  MonthItemsWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  `,

  MonthItems: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    padding: 0.25rem 0;
    border-radius: ${border.radius.xs};
    cursor: pointer;

    &:hover {
      background-color: ${colors.semantic.hover.primary};
    }

    &:active {
      background-color: ${colors.semantic.primary};
      color: ${colors.semantic.light};
    }

    &.current-month {
      background-color: ${colors.semantic.primary};
      color: ${colors.semantic.light};
    }
  `,
};

export default MonthPickerDetail;
