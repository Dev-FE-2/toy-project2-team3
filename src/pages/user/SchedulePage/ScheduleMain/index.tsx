import DetailScheduleWrapper from './DetailScheduleWrapper';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../state/store';
import MainCalendar from './MainCalendar';

const ScheduleMain = () => {
  const { isDayClick } = useSelector((state: RootState) => state.schedule);

  return <>{!isDayClick ? <MainCalendar /> : <DetailScheduleWrapper />}</>;
};

export default ScheduleMain;
