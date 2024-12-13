import { ChangeEvent } from 'react';
import defaultImage from 'public/avatar.svg';

interface InputFileProps {
  label: string;
  name: string;
  value: string;
  accept: string;
  required?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputFile = ({
  label,
  name,
  value,
  accept,
  required,
  onChange,
}: InputFileProps) => {
  return (
    <fieldset>
      <legend>{label}</legend>
      <label htmlFor={name} className="form-file-preview">
        <img
          src={defaultImage}
          alt="등록할 프로필 사진 이미지"
          id="previewImage"
        />
      </label>
      <input
        type="file"
        className="form-item"
        placeholder={label}
        id={name}
        name={name}
        value={value}
        accept={accept}
        onChange={onChange}
        {...(required ? { required } : {})}
      />
    </fieldset>
  );
};

export default InputFile;
