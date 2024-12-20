import { getDatabase, ref, get } from 'firebase/database';
import { auth } from '../firebaseConfig'; // Firebase 설정 파일에서 auth 가져오기
import type { User } from '../types/interface';

export const fetchUserInfo = (callback: (userInfo: User | null) => void) => {
  const unsubscribe = auth.onAuthStateChanged(async (user) => {
    if (!user) {
      console.log('사용자가 로그인되지 않았습니다.'); // 오류 로그
      callback(null);

      return;
    }

    const uid = user.uid;
    const db = getDatabase();
    const userRef = ref(db, `Users/${uid}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const userInfo = snapshot.val();

      callback(userInfo); // 사용자 정보 반환
    } else {
      console.log('데이터베이스에 사용자 정보가 없습니다.');

      callback(null);
    }
  });

  // 컴포넌트 언마운트 시 리스너 정리
  return () => unsubscribe();
};

export default fetchUserInfo;
