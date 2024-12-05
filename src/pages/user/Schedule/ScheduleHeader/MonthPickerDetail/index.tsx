import styled from 'styled-components';
import { styles } from '../../../../../styles';
import { MONTHS } from '../constants';

interface MonthPickerDetailProps {
  currentMonth: number;
  handleMonthClick: (clickedMonth: number) => void;
}

const MonthPickerDetail = ({
  currentMonth,
  handleMonthClick,
}: MonthPickerDetailProps) => {
  const MONTHS_ARRAY = Object.values(MONTHS);

  console.log(MONTHS_ARRAY);

  return (
    <StyledWrapper>
      <StyledMonth>
        {MONTHS_ARRAY.map((month, index) => (
          <StyledMonthItemsWrapper key={month}>
            <StyledMonthItems
              className={MONTHS[currentMonth] === month ? 'current-month' : ''}
              onClick={() => handleMonthClick(index)}
            >
              {month}
            </StyledMonthItems>
          </StyledMonthItemsWrapper>
        ))}
      </StyledMonth>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  border-bottom: 1px solid ${styles.colors.semantic.neutral};
  border-left: 1px solid ${styles.colors.semantic.neutral};
  border-right: 1px solid ${styles.colors.semantic.neutral};
  border-radius: 0 0 ${styles.border.radius.xs} ${styles.border.radius.xs};
  background-color: ${styles.colors.semantic.light};
  width: 15rem;
  position: absolute;
  top: 2.25rem;
  z-index: 3;
`;

const StyledMonth = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  width: 100%;
  aspect-ratio: 3 / 2;
`;

const StyledMonthItemsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const StyledMonthItems = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  padding: 0.25rem 0;
  border-radius: ${styles.border.radius.xs};
  cursor: pointer;

  &:hover {
    background-color: ${styles.colors.semantic.hover.primary};
  }

  &:active {
    background-color: ${styles.colors.semantic.primary};
    color: ${styles.colors.semantic.light};
  }

  &.current-month {
    background-color: ${styles.colors.semantic.primary};
    color: ${styles.colors.semantic.light};
  }
`;

export default MonthPickerDetail;
