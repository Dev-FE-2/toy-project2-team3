import { useFetchSWR } from '../useFetchSWR';
import type { Attendance } from '../../types/interface';
import { collection } from '../../constant';

const useFetchAttendances = () => {
  const { data, error, isLoading, mutate } = useFetchSWR<Attendance>({
    table: collection.attendance,
  });

  return {
    data: data ? Object.values(data) : [],
    error,
    isLoading,
    mutate,
  };
};

export { useFetchAttendances };
