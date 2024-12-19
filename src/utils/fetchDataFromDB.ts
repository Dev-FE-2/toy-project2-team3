import { ref, get, DatabaseReference } from 'firebase/database';
import { database } from '../firebaseConfig';

type FetchData<T> = Promise<T[] | null>;

interface FetchDataParams {
  table: string;
  key?: string;
}

const fetchDataFromDB = async <T>({
  table,
  key,
}: FetchDataParams): FetchData<T> => {
  try {
    const dbRef: DatabaseReference = key
      ? ref(database, `${table}/${key}`)
      : ref(database, table);

    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      const result = Object.entries(data).map(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          return {
            id: key,
            ...value,
          } as T;
        }
        return {
          id: key,
          value,
        } as T;
      });

      return result;
    } else {
      console.warn('데이터가 존재하지 않습니다.');
      return null;
    }
  } catch (error) {
    console.error('데이터 가져오기 실패:', error);
    throw error;
  }
};

export { fetchDataFromDB };
