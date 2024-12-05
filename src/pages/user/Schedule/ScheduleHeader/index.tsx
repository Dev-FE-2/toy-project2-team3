import styled from 'styled-components';
import MonthPicker from './MonthPicker';
import { useState } from 'react';
import MonthPickerDetail from './MonthPickerDetail';

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
    setIsMonthPickerDetailOpen(false)
  };

  return (
    <StyledHeader>
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
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  width: 75rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 0 0.5rem 0 0;
`;

export default ScheduleHeader;
