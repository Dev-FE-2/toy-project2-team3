import { useFetchSWR } from '../useFetchSWR';
import type { Schedule } from '../../types/interface';
import { collection } from '../../constant';

const useFetchSchedules = () => {
  const { data, error, isLoading, mutate } = useFetchSWR<Schedule>({
    table: collection.schedule,
  });

  return {
    data: data ? Object.values(data) : [],
    error,
    isLoading,
    mutate,
  };
};

export { useFetchSchedules };
