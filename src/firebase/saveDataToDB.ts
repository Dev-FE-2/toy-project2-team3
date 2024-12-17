import { ref, set, push } from 'firebase/database';
import { database, auth } from '../firebaseConfig';

type SaveData = Promise<string | null>;

interface saveDataParams<T> {
  table: string;
  key?: string;
  data: T;
}

const saveDataToDB = async <T>({
  table,
  key,
  data,
}: saveDataParams<T>): SaveData => {
  try {
    // 사용자 검증
    const user = auth.currentUser;

    if (!user) {
      throw new Error('인증된 사용자가 아닙니다.');
    }

    const dbRef = key ? ref(database, `${table}/${key}`) : ref(database, table);

    if (key) {
      await set(dbRef, data);

      return key;
    } else {
      const newRef = push(dbRef);
      await set(newRef, data);

      return newRef.key;
    }
  } catch (error) {
    console.error('데이터 저장 실패:', error);

    throw error;
  }
};

export { saveDataToDB };

/** 사용방법
 * await saveDataToDB({ table, key, data, requireAuth });
 * ex) await saveDataToDB({ 'Users', 'p0qTmHR3PU1LJ3', { ... } });
 *
 * 매개변수는 { table, key, data, requireAuth } 객체 형태
 *
 * table의 값은 firebase realtime database의 collection name이다.
 * key의 값은 collection의 하위 데이터를 분류하는 문서 이름 혹은 null이 들어갈 수 있다. (optional)
 * key를 null로 전달할 경우 자동으로 uid로 저장된다.
 * data는 저장할 데이터이다.
 * requireAuth는 인증 여부를 확인하는 boolean 값이다.
 */
