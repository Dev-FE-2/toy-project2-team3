import { ref, get, DatabaseReference } from 'firebase/database';
import { database } from '../../firebaseConfig';

export async function fetchDataFromDB<T>(
  collectionName: string,
  docName: string | null = null
): Promise<T | Record<string, T> | null> {
  try {
    const dbRef: DatabaseReference = docName
      ? ref(database, `${collectionName}/${docName}`)
      : ref(database, collectionName);

    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.warn('데이터가 존재하지 않습니다.');
      return null;
    }
  } catch (error) {
    console.error('데이터 가져오기 실패:', error);
    throw error;
  }
}

// 사용방법
/*
  import fetchDataFromDB from '~~~~'

  const USER_DATA = fetchDataFromDB('Users', docName)
  // docName은 문서의 이름 혹은 null이 들어갈 수 있다.
    // 인자 docName을 null로 전달할 경우 'Users'의 모든 데이터를 가져온다.
*/
