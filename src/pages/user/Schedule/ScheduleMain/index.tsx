import { useState } from 'react';
import MainCalendarWrapper from './MainCalendarWrapper';
import DetailScheduleWrapper from './DetailScheduleWrapper';

interface ScheduleMainProps {
  currentMonth: number;
  currentYear: number;
  setIsSixWeek: (prop: boolean) => void;
}

const ScheduleMain = ({
  currentMonth,
  currentYear,
  setIsSixWeek,
}: ScheduleMainProps) => {
  const [isDayClick, setIsDayClick] = useState(false);

  return (
    <>
      {!isDayClick ? (
        <MainCalendarWrapper
          currentMonth={currentMonth}
          currentYear={currentYear}
          setIsSixWeek={setIsSixWeek}
          setIsDayClick={setIsDayClick}
        />
      ) : (
        <DetailScheduleWrapper />
      )}
    </>
  );
};

export default ScheduleMain;
