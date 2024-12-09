import { ref, set, push } from 'firebase/database';
import { database } from '../../firebaseConfig';

export async function saveDataToDB<T>(
  collectionName: string,
  docName: string | null,
  data: T
) {
  try {
    const dbRef = docName
      ? ref(database, `${collectionName}/${docName}`)
      : ref(database, collectionName);

    if (docName) {
      await set(dbRef, data);
      return docName;
    } else {
      const newRef = push(dbRef);
      await set(newRef, data);
      return newRef.key;
    }
  } catch (error) {
    console.error('데이터 저장 실패:', error);
    throw error;
  }
}

// 사용방법
/*
  import saveDataToDB from '~~~~'

  await saveDataToDB('user', docName, data)
  // docName은 문서의 이름 혹은 null이 들어갈 수 있다.
    // 인자 docName을 null로 전달할 경우 uid로 저장된다
  // data는 저장할 데이터
*/
