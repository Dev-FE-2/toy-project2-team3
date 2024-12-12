import { ref, get, DatabaseReference } from 'firebase/database';
import { database } from '../firebaseConfig';

type FetchData<T> = Promise<T | Record<string, T> | null>;

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
      const result = data ? (!key ? Object.values(data) : data) : null;

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

/** 사용 방법
 * await fetchDataFromDB({ table, key });
 * ex) await fetchDataFromDB({ 'Users', 'p0qTmHR3PU1LJ3' });
 *
 * 매개변수는 { table, key } 객체 형태
 *
 * table의 값은 firebase realtime database의 collection name이다.
 * key의 값은 collection의 하위 데이터를 분류하는 문서 이름 혹은 null이 들어갈 수 있다. (optional)
 * key를 null로 전달할 경우 'Users'의 모든 데이터를 가져온다. 반환 값 : {} 형태
 */
