import MainCalendarWrapper from './MainCalendarWrapper';
import DetailScheduleWrapper from './DetailScheduleWrapper';

interface ScheduleMainProps {
  currentMonth: number;
  currentYear: number;
  isDayClick: boolean;
  setIsSixWeek: (prop: boolean) => void;
  setIsDayClick: (prop: boolean) => void;
}

const ScheduleMain = ({
  currentMonth,
  currentYear,
  isDayClick,
  setIsSixWeek,
  setIsDayClick,
}: ScheduleMainProps) => {
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
