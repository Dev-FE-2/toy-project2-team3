import useSWR from 'swr';
import { TeamData } from '../types/schedule';
import { COLLECTION_NAME } from '../constant';

export const useTeam = (onSuccess?: (data: TeamData[]) => void) => {
  const {
    data: teamData = [],
    error,
    isLoading,
    mutate,
  } = useSWR<TeamData[]>(
    { table: COLLECTION_NAME.teams },
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      onSuccess,
    }
  );

  return {
    teamData,
    error,
    isLoading,
    mutate,
  };
};
