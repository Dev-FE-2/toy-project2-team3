import { fetchDataFromDB } from '../firebase';

const swrFetcher = async (path: string) => {
  const [table, key] = path.split('/');
  const result = await fetchDataFromDB({ table, key });

  return result;
};

export { swrFetcher };
