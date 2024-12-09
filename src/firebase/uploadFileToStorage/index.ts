import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebaseConfig';

/**
 * 파일을 Firebase Storage에 업로드하고 다운로드 URL을 반환하는 함수
 * @param {File} file - 업로드할 파일
 * @param {string} folderPath - 파일이 저장될 폴더 경로 (예: 'uploads/')
 * @returns {Promise<string>} - 다운로드 가능한 URL
 */

export const uploadFileToStorage = async (
  folderPath: string,
  file: File
): Promise<string> => {
  try {
    const uniqueFileName = `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `${folderPath}/${uniqueFileName}`);

    const snapshot = await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error('파일 업로드 실패:', error);
    throw new Error('파일 업로드 중 오류가 발생했습니다.');
  }
};

// 사용방법
/*
import { uploadFileToStorage } from '~~~~~~~';
import {useState} from 'react'

const ExampleComponent = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
      setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    
    try {
      const downloadURL = await uploadFileToStorage(filePath, file);
      // filePath는 각자 원하는 방식으로 저장
      
      // DB에 downloadURL 저장 로직 필요
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>업로드</button>
    </>
  )
};
*/
