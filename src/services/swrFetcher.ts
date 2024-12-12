import { fetchDataFromDB } from '../firebase';

export type FetchParams = {
  table: string;
  key?: string;
};

const swrFetcher = async ({ table, key }: FetchParams) => {
  const result = await fetchDataFromDB({ table, key });

  return result;
};

export { swrFetcher };
