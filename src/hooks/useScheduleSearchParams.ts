import { useSearchParams } from 'react-router-dom';

type ScheduleSearchParamsKey = 'user' | 'date' | 'schedule';

export const useScheduleSearchParams = (paramsKey: ScheduleSearchParamsKey) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = searchParams.get(paramsKey);

  const setValue = (newValue: string | null) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (newValue === null) {
      newSearchParams.delete(paramsKey);
    } else {
      newSearchParams.set(paramsKey, newValue);
    }

    setSearchParams(newSearchParams);
  };

  return [value, setValue] as const;
};
