import MainCalendarWrapper from './MainCalendarWrapper';
import DetailScheduleWrapper from './DetailScheduleWrapper';
import { SetStateAction } from 'react';

interface TeamMembersData {
  name: string;
  userId: string;
  number: number;
}

interface CurrentSchedule {
  type: string;
  teamId: TeamMembersData[];
  userId?: string;
}

interface ScheduleList {
  createdAt: string;
  detail: string;
  endedAt: string;
  startedAt: string;
  title: string;
  updatedAt: string;
}

interface TargetSchedule extends ScheduleList {
  id: string;
  index: number;
  name: string;
  userId: string;
}

interface ScheduleMainProps {
  currentSchedule: CurrentSchedule;
  currentMonth: number;
  currentYear: number;
  isDayClick: boolean;
  clickedDate: number[];
  setIsSixWeek: (prop: boolean) => void;
  setIsDayClick: (prop: boolean) => void;
  setClickedDate: React.Dispatch<SetStateAction<number[]>>;
  handleRModalOpen: (targetSchedule: TargetSchedule) => void;
}

const ScheduleMain = ({
  currentSchedule,
  currentMonth,
  currentYear,
  isDayClick,
  clickedDate,
  setIsSixWeek,
  setIsDayClick,
  setClickedDate,
  handleRModalOpen,
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
          setClickedDate={setClickedDate}
        />
      ) : (
        <DetailScheduleWrapper
          currentSchedule={currentSchedule}
          clickedDate={clickedDate}
          handleRModalOpen={handleRModalOpen}
        />
      )}
    </>
  );
};

export default ScheduleMain;
