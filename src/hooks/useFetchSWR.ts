import useSWR from 'swr';

export type FetchParams = {
  table: string;
  key?: string;
};

const useFetchSWR = <T>({ table, key }: FetchParams) => {
  const path = key ? `${table}/${key}` : table;
  const { data, error, isLoading, mutate } = useSWR<T | null>(path);

  return {
    data,
    error,
    isLoading,
    mutate, // 데이터 리패칭이나 업데이트 시 사용 가능
  };
};

export { useFetchSWR };
