import styled from 'styled-components';
import { border } from '../../../../../styles';
import { MONTHS } from '../constants';

interface SetIsMonthPickerDetailOpen {
  currentMonth: number;
  currentYear: number;
  handleYearMonthChange: (year: number, month: number) => void;
  isMonthPickerDetailOpen: boolean;
  setIsMonthPickerDetailOpen: (isOpen: boolean) => void;
}

const MonthPicker = ({
  currentMonth,
  currentYear,
  handleYearMonthChange,
  isMonthPickerDetailOpen,
  setIsMonthPickerDetailOpen,
}: SetIsMonthPickerDetailOpen) => {
  const handleOnClickMonth = () => {
    setIsMonthPickerDetailOpen(true);
  };

  const handlePrevMonth = () => {
    const NEW_YEAR = currentMonth === 1 ? currentYear - 1 : currentYear;
    const NEW_MONTH = currentMonth === 1 ? 12 : currentMonth - 1;
    handleYearMonthChange(NEW_YEAR, NEW_MONTH);
  };

  const handlePrevYear = () => {
    const NEW_YEAR = currentYear - 1;
    handleYearMonthChange(NEW_YEAR, currentMonth);
  };

  const handleNextMonth = () => {
    const NEW_YEAR = currentMonth === 12 ? currentYear + 1 : currentYear;
    const NEW_MONTH = currentMonth === 12 ? 1 : currentMonth + 1;
    handleYearMonthChange(NEW_YEAR, NEW_MONTH);
  };

  const handleNextYear = () => {
    const NEW_YEAR = currentYear + 1;
    handleYearMonthChange(NEW_YEAR, currentMonth);
  };

  return (
    <StyledWrapper>
      <div onClick={isMonthPickerDetailOpen ? handlePrevYear : handlePrevMonth}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#333"
        >
          <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
        </svg>
      </div>
      <div onClick={handleOnClickMonth}>
        {isMonthPickerDetailOpen
          ? currentYear
          : `${currentYear} ${MONTHS[currentMonth]}`}
      </div>
      <div onClick={isMonthPickerDetailOpen ? handleNextYear : handleNextMonth}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#333"
        >
          <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
        </svg>
      </div>

      {/* 추후 svg 태그 => 구글 웹 폰트 아이콘 클래스로 변경 시 아래 코드로 리팩토링 예정 */}
      {/* {isMonthPickerDetailOpen ? (
        <>
          <div onClick={handlePrevYear}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#333"
            >
              <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
            </svg>
          </div>
          <div onClick={handleOnClickMonth}>{currentYear}</div>
          <div onClick={handleNextYear}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#333"
            >
              <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
            </svg>
          </div>
        </>
      ) : (
        <>
          <div onClick={handlePrevMonth}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#333"
            >
              <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
            </svg>
          </div>
          <div
            onClick={handleOnClickMonth}
          >{`${currentYear} ${MONTHS[currentMonth]}`}</div>
          <div onClick={handleNextMonth}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#333"
            >
              <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
            </svg>
          </div>
        </>
      )} */}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
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
`;

export default MonthPicker;
