import styled from 'styled-components';
import { colors } from '../../styles';
import { useRef, useState } from 'react';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { storage } from '../../firebaseConfig';

interface FileUploadingProps {
  filePath: string;
  setUrl: (url: string) => void;
}

const FileUploading = ({ filePath, setUrl }: FileUploadingProps) => {
  const [isFileUpload, setIsFileUpload] = useState(false);
  const [fileName, setFileName] = useState('');
  const [displayFileName, setDisplayFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const FILE_INPUT_REF = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uniqueFileName = `${Date.now()}_${file.name}`;
    setIsLoading(true);
    setFileName(uniqueFileName);
    setDisplayFileName(file.name);

    try {
      const fileRef = ref(storage, `${filePath}/${uniqueFileName}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      setUrl(url);
      setIsFileUpload(true);
    } catch (error) {
      console.error('파일 업로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileDelete = async () => {
    if (!isFileUpload) return;

    setIsLoading(true);

    try {
      const fileRef = ref(storage, `${filePath}/${fileName}`);
      await deleteObject(fileRef);
      setFileName('');
      setDisplayFileName('');
      setIsFileUpload(false);
    } catch (error) {
      console.error('파일 삭제 실패:', error);
    } finally {
      setIsLoading(false);
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
        disabled={isLoading}
      />
      <S.Input
        type="text"
        value={displayFileName}
        placeholder="파일 추가를 눌러주세요."
        readOnly
      />
      <S.Button
        isFileUpload={isFileUpload}
        onClick={handleButtonClick}
        disabled={isLoading}
      >
        {isFileUpload ? '파일 삭제' : '파일 추가'}
      </S.Button>
    </S.Wrapper>
  );
};
const S = {
  Wrapper: styled.div`
    border: 1px solid black;
    width: 1000px;
    height: 51px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
  `,
  Input: styled.input`
    padding: 12px;
  `,
  Button: styled.button<{ isFileUpload: boolean; disabled: boolean }>`
    padding: 13px 28px;
    border-radius: 6px;
    min-width: 120px;
    min-height: 51px;
    cursor: pointer;

    ${(props) =>
      props.disabled
        ? `background-color: ${colors.semantic.disabled};
          color: ${colors.semantic.light};
          cursor: not-allowed`
        : `
    background-color: ${
      props.isFileUpload ? colors.semantic.danger : colors.semantic.success
    };
    color: ${colors.semantic.light};
    border: 1px solid
      ${props.isFileUpload ? colors.semantic.danger : colors.semantic.success};

    &:hover {
      background-color: ${
        props.isFileUpload
          ? colors.semantic.hover.danger
          : colors.semantic.hover.success
      };
      color: ${
        props.isFileUpload ? colors.semantic.danger : colors.semantic.success
      };
      border: 1px solid
        ${
          props.isFileUpload ? colors.semantic.danger : colors.semantic.success
        };
    }`}
  `,
};

export default FileUploading;
