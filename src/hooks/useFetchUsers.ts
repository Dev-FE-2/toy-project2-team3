import { useFetchSWR } from './useFetchSWR';
import type { User } from '../types/interface';

const useFetchUsers = () => {
  const { data, error, isLoading, mutate } = useFetchSWR<User>({
    table: 'Users',
  });

  return {
    data: data ? Object.values(data) : [],
    error,
    isLoading,
    mutate,
  };
};

export { useFetchUsers };
