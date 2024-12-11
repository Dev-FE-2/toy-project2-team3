import { useFetchSWR } from '../useFetchSWR';
import type { User } from '../../types/interface';
import { collection } from '../../constant';

const useFetchUsers = () => {
  const { data, error, isLoading, mutate } = useFetchSWR<User>({
    table: collection.users,
  });

  return {
    data: data ? Object.values(data) : [],
    error,
    isLoading,
    mutate,
  };
};

export { useFetchUsers };
