import { useState } from 'react';
import { mutate } from 'swr';
import { saveDataToDB } from '../firebase';

interface UseSaveDataParams<T> {
  table: string;
  key?: string;
  data: T;
  requireAuth?: boolean;
}

interface UseSaveDataReturn<T> {
  saveData: (data: T) => Promise<string | null>;
  isSaving: boolean;
  error: Error | null;
}

function useSaveData<T>({
  table,
  key,
  requireAuth = false,
}: UseSaveDataParams<T>): UseSaveDataReturn<T> {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const saveData = async (data: T): Promise<string | null> => {
    setIsSaving(true);
    setError(null);

    try {
      // 1. Firebase 데이터 저장
      const savedKey = await saveDataToDB({ table, key, data, requireAuth });

      // 2. SWR 캐시 갱신 (로컬 데이터와 서버 데이터 동기화)
      const cacheKey = key ? `${table}/${key}` : table;
      await mutate(cacheKey, data, false); // false: 서버 요청 없이 캐시만 업데이트

      return savedKey;
    } catch (err) {
      setError(err as Error);

      return null;
    } finally {
      setIsSaving(false);
    }
  };

  return { saveData, isSaving, error };
}

export { useSaveData };
