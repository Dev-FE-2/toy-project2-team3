import styled from 'styled-components';
import { useRef, useState } from 'react';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { storage } from '../../firebaseConfig';
import Button from '../form/Button';
import { border, colors, padding } from '../../styles';

interface FileUploadingProps {
  filePath: string;
  setUrl: (url: string) => void;
  setName?: (name: string) => void;
  setIsLoading?: (isLoading: boolean) => void;
}

const FileUploading = ({
  filePath,
  setUrl,
  setName,
  setIsLoading,
}: FileUploadingProps) => {
  const [isFileUpload, setIsFileUpload] = useState(false);
  const [fileName, setFileName] = useState('');
  const [displayFileName, setDisplayFileName] = useState('');
  const [isLoadingOrigin, setIsLoadingOrigin] = useState(false);
  const FILE_INPUT_REF = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uniqueFileName = `${Date.now()}_${file.name}`;
    setIsLoadingOrigin(true);
    setDisplayFileName(file.name);
    setFileName(file.name);

    if (setName) {
      setName(file.name);
    }

    if (setIsLoading) {
      setIsLoading(true);
    }

    try {
      const fileRef = ref(storage, `${filePath}/${uniqueFileName}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      setUrl(url);
      setIsFileUpload(true);
    } catch (error) {
      console.error('파일 업로드 실패:', error);
    } finally {
      setIsLoadingOrigin(false);

      if (setIsLoading) {
        setIsLoading(false);
      }
    }
  };

  const handleFileDelete = async () => {
    if (!isFileUpload) return;

    setIsLoadingOrigin(true);

    if (setIsLoading) {
      setIsLoading(true);
    }

    try {
      const fileRef = ref(storage, `${filePath}/${fileName}`);
      await deleteObject(fileRef);
      setFileName('');
      setDisplayFileName('');
      setIsFileUpload(false);
    } catch (error) {
      console.error('파일 삭제 실패:', error);
    } finally {
      setIsLoadingOrigin(false);

      if (setIsLoading) {
        setIsLoading(false);
      }
    }
  };

  const handleButtonClick = () => {
    if (isFileUpload) {
      handleFileDelete();
    } else {
      FILE_INPUT_REF.current?.click();
    }
  };

  return (
    <S.Wrapper>
      <S.Input
        ref={FILE_INPUT_REF}
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileUpload}
        disabled={isLoadingOrigin}
      />
      <S.Input
        type="text"
        value={displayFileName}
        placeholder="파일 추가를 눌러주세요."
        readOnly
      />
      <Button
        color={
          isLoadingOrigin ? 'disabled' : isFileUpload ? 'danger' : 'success'
        }
        text={
          isLoadingOrigin
            ? '처리 중...'
            : isFileUpload
              ? '파일 삭제'
              : '파일 추가'
        }
        onClick={handleButtonClick}
        padding="13px 9px"
      />
    </S.Wrapper>
  );
};
const S = {
  Wrapper: styled.div`
    width: 100%;
    height: 51px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
  `,
  Input: styled.input`
    /* padding: 12px;
    flex: 1; */
    width: 100%;
    height: 51px;
    line-height: 1;
    padding: 0 ${padding.md};
    border: ${border.default};
    border-radius: ${border.radius.xs};
    outline-color: ${colors.semantic.hover.primary};
    flex: 1;
  `,
};

export default FileUploading;
