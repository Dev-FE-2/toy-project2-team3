import MainCalendarWrapper from './MainCalendarWrapper';
import DetailScheduleWrapper from './DetailScheduleWrapper';

interface TeamMembersData {
  name: string;
  userId: string;
}

interface CurrentSchedule {
  type: string;
  teamId: TeamMembersData[];
  userId?: string;
}

interface ScheduleMainProps {
  currentSchedule: CurrentSchedule;
  currentMonth: number;
  currentYear: number;
  isDayClick: boolean;
  setIsSixWeek: (prop: boolean) => void;
  setIsDayClick: (prop: boolean) => void;
}

const ScheduleMain = ({
  currentSchedule,
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
          currentSchedule={currentSchedule}
          currentMonth={currentMonth}
          currentYear={currentYear}
          setIsSixWeek={setIsSixWeek}
          setIsDayClick={setIsDayClick}
        />
      ) : (
        <DetailScheduleWrapper currentSchedule={currentSchedule} />
        <DetailScheduleWrapper />
      )}
    </>
  );
};

export default ScheduleMain;
