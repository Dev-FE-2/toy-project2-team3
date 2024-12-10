import styled from 'styled-components';
import MonthPicker from './MonthPicker';
import { useState } from 'react';
import MonthPickerDetail from './MonthPickerDetail';
import { border } from '../../../../styles';
import { MONTHS } from '../constants';

interface ScheduleHeaderProps {
  currentMonth: number;
  currentYear: number;
  handleYearMonthChange: (year: number, month: number) => void;
}

const ScheduleHeader = ({
  currentMonth,
  currentYear,
  handleYearMonthChange,
}: ScheduleHeaderProps) => {
  const [isMonthPickerDetailOpen, setIsMonthPickerDetailOpen] = useState(false);

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

  return (
    <S.Header>
      {isMonthPickerDetailOpen ? (
        <MonthPicker
          content={currentYear}
          setIsMonthPickerDetailOpen={setIsMonthPickerDetailOpen}
          onClickLeft={handlePrevYear}
          onClickRight={handleNextYear}
        />
      ) : (
        <MonthPicker
          content={`${currentYear} ${MONTHS[currentMonth]}`}
          setIsMonthPickerDetailOpen={setIsMonthPickerDetailOpen}
          onClickLeft={handlePrevMonth}
          onClickRight={handleNextMonth}
        />
      )}

      {isMonthPickerDetailOpen && (
        <MonthPickerDetail
          currentMonth={currentMonth}
          handleMonthClick={handleMonthClick}
        />
      )}
    </S.Header>
  );
};

const S = {
  Header: styled.div`
    width: 1250px;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: ${border.default};
  `,
};

export default ScheduleHeader;
