import { useFetchSWR } from '../useFetchSWR';
import type { Teams } from '../../types/interface';
import { collection } from '../../constant';

const useFetchTeams = () => {
  const { data, error, isLoading, mutate } = useFetchSWR<Teams>({
    table: collection.teams,
  });

  return {
    data: data ? Object.values(data) : [],
    error,
    isLoading,
    mutate,
  };
};

export { useFetchTeams };
