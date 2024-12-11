import { useFetchSWR } from '../useFetchSWR';
import type { SalaryRequest } from '../../types/interface';
import { collection } from '../../constant';

const useFetchSalaryRequests = () => {
  const { data, error, isLoading, mutate } = useFetchSWR<SalaryRequest>({
    table: collection.salaryRequest,
  });

  return {
    data: data ? Object.values(data) : [],
    error,
    isLoading,
    mutate,
  };
};

export { useFetchSalaryRequests };
