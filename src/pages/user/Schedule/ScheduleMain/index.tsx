import MainCalendarWrapper from './MainCalendarWrapper';
import DetailScheduleWrapper from './DetailScheduleWrapper';
import { useState } from 'react';

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
  const [clickedDate, setClickedDate] = useState<number[]>([]);

  return (
    <>
      {!isDayClick ? (
        <MainCalendarWrapper
          currentSchedule={currentSchedule}
          currentMonth={currentMonth}
          currentYear={currentYear}
          setIsSixWeek={setIsSixWeek}
          setIsDayClick={setIsDayClick}
          setClickedDate={setClickedDate}
        />
      ) : (
        <DetailScheduleWrapper
          currentSchedule={currentSchedule}
          clickedDate={clickedDate}
        />
      )}
    </>
  );
};

export default ScheduleMain;
