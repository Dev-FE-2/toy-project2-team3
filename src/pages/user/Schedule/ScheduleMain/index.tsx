import DetailScheduleWrapper from './DetailScheduleWrapper';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../state/store';
import MainCalendar from './MainCalendarWrapper/MainCalendar';

const ScheduleMain = () => {
  const { isDayClick } = useSelector((state: RootState) => state.schedule);
  return (
    <>
      {!isDayClick ? (
        <MainCalendar />
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
