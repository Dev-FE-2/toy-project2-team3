import { useState, useEffect } from 'react';
import { fetchUserInfo } from '../utils/fetchUserInfo';
import type { User } from '../types/interface';

const useFetchUserInfo = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<{ message: string } | null>(null);

  useEffect(() => {
    const unsubscribe = fetchUserInfo((data) => {
      if (data) {
        setUserInfo(data);
      } else {
        setError({ message: '유저 데이터가 없습니다.' });
      }
      setLoading(false);
    });

    return () => {
      unsubscribe(); // 컴포넌트 언마운트 시 리스너 정리
    };
  }, []);

  return { userInfo, isLoading, error };
};

export { useFetchUserInfo };
