import styled from 'styled-components';
import MonthPicker from './MonthPicker';
import { useState } from 'react';
import { border } from '../../../../styles';
import { StyledCheckButton } from '../../../../components/Button';
import { MONTHS } from '../constants';

interface TeamData {
  id: string;
  name: string;
  members: TeamMembersData[];
}

interface TeamMembersData {
  name: string;
  userId: string;
}

interface ScheduleHeaderProps {
  currentMonth: number;
  currentYear: number;
  isDayClick: boolean;
  clickedDate: number[];
  teamData: TeamData[];
  handleYearMonthChange: (year: number, month: number) => void;
  setIsAddScheduleModalOpen: (isOpen: boolean) => void;
  setIsDayClick: (prop: boolean) => void;
}

const ScheduleHeader = ({
  currentMonth,
  currentYear,
  isDayClick,
  clickedDate,
  teamData,
  handleYearMonthChange,
  setIsAddScheduleModalOpen,
  setIsDayClick,
}: ScheduleHeaderProps) => {
  const [isMonthPickerDetailOpen, setIsMonthPickerDetailOpen] = useState(false);
  const [year, month, day] = clickedDate;
  const formattedMonth = String(month).padStart(2, '0');
  const formattedDay = String(day).padStart(2, '0');
  const formattedClickedDate = `${year}-${formattedMonth}-${formattedDay}`;
  const teamName = teamData.map((data) => data.name);

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
    <S.Header isDayClick={isDayClick}>
      {isDayClick ? (
        <>
          <S.Icon
            onClick={() => setIsDayClick(false)}
            className="material-symbols-outlined"
          >
            arrow_back_ios
          </S.Icon>
          <div>
            {teamName} | {formattedClickedDate}
          </div>
          {/* 👆 추후 데이터 바인딩, 전역 상태 관리로 변경할 때 옳게 표시할 예정입니다 */}
          <div></div>
        </>
      ) : (
        <MonthPicker
          content={
            isMonthPickerDetailOpen
              ? currentYear
              : `${currentYear} ${MONTHS[currentMonth]}`
          }
          currentMonth={currentMonth}
          isMonthPickerDetailOpen={isMonthPickerDetailOpen}
          handleMonthClick={handleMonthClick}
          setIsMonthPickerDetailOpen={setIsMonthPickerDetailOpen}
          onClickLeft={
            isMonthPickerDetailOpen ? handlePrevYear : handlePrevMonth
          }
          onClickRight={
            isMonthPickerDetailOpen ? handleNextYear : handleNextMonth
          }
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
  Header: styled.div<{ isDayClick: boolean }>`
    width: 1250px;
    height: 3rem;
    display: flex;
    justify-content: ${(props) =>
      props.isDayClick ? 'space-between' : 'center'};
    align-items: center;
    border: ${border.default};
  `,
  Icon: styled.div`
    margin-left: 0.5rem;
    padding: 0 0.5rem;
    cursor: pointer;
  `,
};

export default ScheduleHeader;
