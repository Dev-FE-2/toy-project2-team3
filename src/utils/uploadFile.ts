import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { storage } from '../firebaseConfig';

export const uploadFile = async (
  file: File,
  filePath: string,
  setIsLoading: (value: boolean) => void
): Promise<string | null> => {
  const uniqueFileName = `${Date.now()}_${file.name}`; // 고유한 파일 이름 생성
  setIsLoading(true); // 로딩 상태 시작

  try {
    const fileRef = ref(storage, `${filePath}/${uniqueFileName}`); // 파일 참조 생성
    await uploadBytes(fileRef, file); // 파일 업로드

    const url = await getDownloadURL(fileRef); // 업로드된 파일의 다운로드 URL 가져오기
    return url; // URL 반환
  } catch (error) {
    console.error('파일 업로드 실패:', error); // 에러 처리
    return null; // 실패 시 null 반환
  } finally {
    setIsLoading(false); // 로딩 상태 종료
  }
};

export const deleteFile = async (filePath: string) => {
  const fileRef = ref(storage, filePath); // 파일 참조를 생성합니다.
  try {
    await deleteObject(fileRef); // 파일 삭제
    console.log(`파일이 삭제되었습니다: ${filePath}`);
  } catch (error) {
    console.error('파일 삭제 실패:', error);
  }
};
