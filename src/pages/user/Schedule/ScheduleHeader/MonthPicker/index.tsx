import styled from 'styled-components';
import { border } from '../../../../../styles';
import MonthPickerDetail from './MonthPickerDetail';

interface SetIsMonthPickerDetailOpen {
  content: string | number;
  currentMonth: number;
  isMonthPickerDetailOpen: boolean;
  handleMonthClick: (clickedMonth: number) => void;
  setIsMonthPickerDetailOpen: (open: boolean) => void;
  onClickLeft: () => void;
  onClickRight: () => void;
}

const MonthPicker = ({
  content,
  currentMonth,
  isMonthPickerDetailOpen,
  handleMonthClick,
  setIsMonthPickerDetailOpen,
  onClickLeft,
  onClickRight,
}: SetIsMonthPickerDetailOpen) => {
  const handleOnClickMonth = () => {
    setIsMonthPickerDetailOpen(true);
  };

  return (
    <>
      <S.Wrapper>
        <div className="material-symbols-outlined" onClick={onClickLeft}>
          chevron_left
        </div>
        <div onClick={handleOnClickMonth}>{content}</div>
        <div className="material-symbols-outlined" onClick={onClickRight}>
          chevron_right
        </div>
      </S.Wrapper>
      {isMonthPickerDetailOpen && (
        <MonthPickerDetail
          currentMonth={currentMonth}
          handleMonthClick={handleMonthClick}
        />
      )}
    </>
  );
};

const S = {
  Wrapper: styled.div`
    width: 15rem;
    padding: 0.25rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: ${border.default};
    border-radius: ${border.radius.xs};

    div {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  `,
};

export default MonthPicker;
