import styled from 'styled-components';
import MonthPicker from './MonthPicker';
import { useState } from 'react';
import MonthPickerDetail from './MonthPickerDetail';
import { border } from '../../../../styles';

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

  return (
    <S.Header>
      <MonthPicker
        currentMonth={currentMonth}
        currentYear={currentYear}
        handleYearMonthChange={handleYearMonthChange}
        isMonthPickerDetailOpen={isMonthPickerDetailOpen}
        setIsMonthPickerDetailOpen={setIsMonthPickerDetailOpen}
      />
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
