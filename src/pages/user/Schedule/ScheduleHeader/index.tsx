import styled from 'styled-components';
import MonthPicker from './MonthPicker';
import { useState } from 'react';
import MonthPickerDetail from './MonthPickerDetail';
import { border } from '../../../../styles';
import { StyledCheckButton } from '../../../../components/Button';

interface ScheduleHeaderProps {
  currentMonth: number;
  currentYear: number;
  handleYearMonthChange: (year: number, month: number) => void;
  setIsAddScheduleModalOpen: (isOpen: boolean) => void;
}

const ScheduleHeader = ({
  currentMonth,
  currentYear,
  handleYearMonthChange,
  setIsAddScheduleModalOpen,
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
      <StyledCheckButton onClick={() => setIsAddScheduleModalOpen(true)}>
        등록
      </StyledCheckButton>{' '}
      {/* 임시 */}
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
