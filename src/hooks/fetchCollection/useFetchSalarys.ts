import { useFetchSWR } from '../useFetchSWR';
import type { Salary } from '../../types/interface';
import { collection } from '../../constant';

const useFetchSalarys = () => {
  const { data, error, isLoading, mutate } = useFetchSWR<Salary>({
    table: collection.salary,
  });

  return {
    data: data ? Object.values(data) : [],
    error,
    isLoading,
    mutate,
  };
};

export { useFetchSalarys };
