import styled from 'styled-components';
import { border } from '../../../../../styles';
import MonthPickerDetail from './MonthPickerDetail';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../state/store';
import { MONTHS } from '../../constants';
import {
  setCurrentMonth,
  setCurrentYear,
} from '../../../../../slices/schedule/scheduleSlice';
import { useState } from 'react';

const MonthPicker = () => {
  const [isMonthPickerDetailOpen, setIsMonthPickerDetailOpen] = useState(false);
  const dispatch = useDispatch();

  const { currentMonth, currentYear } = useSelector(
    (state: RootState) => state.schedule
  );

  const handleOnClickMonth = () => {
    setIsMonthPickerDetailOpen(true);
  };

  const handleYearMonthChange = (year: number, month: number) => {
    dispatch(setCurrentYear(year));
    dispatch(setCurrentMonth(month));
  };

  const handleMonthClick = (clickedMonth: number) => {
    handleYearMonthChange(currentYear, clickedMonth + 1);
    setIsMonthPickerDetailOpen(false);
  };

  const handlePrevMonth = () => {
    const newYear = currentMonth === 1 ? currentYear - 1 : currentYear;
    const newMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    handleYearMonthChange(newYear, newMonth);
  };

  const handlePrevYear = () => {
    const newYear = currentYear - 1;
    handleYearMonthChange(newYear, currentMonth);
  };

  const handleNextMonth = () => {
    const newYear = currentMonth === 12 ? currentYear + 1 : currentYear;
    const newMonth = currentMonth === 12 ? 1 : currentMonth + 1;
    handleYearMonthChange(newYear, newMonth);
  };

  const handleNextYear = () => {
    const newYear = currentYear + 1;
    handleYearMonthChange(newYear, currentMonth);
  };

  const content = isMonthPickerDetailOpen
    ? currentYear
    : `${currentYear} ${MONTHS[currentMonth]}`;

  const onClickLeftArrow = isMonthPickerDetailOpen
    ? handlePrevYear
    : handlePrevMonth;

  const onClickRightArrow = isMonthPickerDetailOpen
    ? handleNextYear
    : handleNextMonth;

  return (
    <>
      <S.Wrapper>
        <div className="material-symbols-outlined" onClick={onClickLeftArrow}>
          chevron_left
        </div>
        <div onClick={handleOnClickMonth}>{content}</div>
        <div className="material-symbols-outlined" onClick={onClickRightArrow}>
          chevron_right
        </div>
        {isMonthPickerDetailOpen && (
          <MonthPickerDetail handleMonthClick={handleMonthClick} />
        )}
      </S.Wrapper>
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
    margin-left: 150px;
    position: relative;

    div {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  `,
};

export default MonthPicker;
