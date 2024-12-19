import useSWR from 'swr';
import { ScheduleData } from '../types/schedule';
import { COLLECTION_NAME } from '../constant';

export const useSchedule = () => {
  const {
    data: scheduleData,
    error,
    isLoading,
    mutate,
  } = useSWR<ScheduleData[]>(
    { table: COLLECTION_NAME.schedule },
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  return {
    scheduleData,
    error,
    isLoading,
    mutate,
  };
};
