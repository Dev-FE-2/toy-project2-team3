import styled from 'styled-components';
import { border } from '../../../../../styles';
interface SetIsMonthPickerDetailOpen {
  content: string | number;
  setIsMonthPickerDetailOpen: (open: boolean) => void;
  onClickLeft: () => void;
  onClickRight: () => void;
}

const MonthPicker = ({
  content,
  onClickLeft,
  onClickRight,
  setIsMonthPickerDetailOpen,
}: SetIsMonthPickerDetailOpen) => {
  const handleOnClickMonth = () => {
    setIsMonthPickerDetailOpen(true);
  };

  return (
    <S.Wrapper>
      <div className="material-symbols-outlined" onClick={onClickLeft}>
        chevron_left
      </div>
      <div onClick={handleOnClickMonth}>{content}</div>
      <div className="material-symbols-outlined" onClick={onClickRight}>
        chevron_right
      </div>
    </S.Wrapper>
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
