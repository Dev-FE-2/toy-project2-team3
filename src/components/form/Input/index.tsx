import { ChangeEvent } from 'react';

interface InputProps {
  label: string;
  type: string;
  placeholder: string;
  name: string;
  value: string;
  required?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  label,
  type,
  placeholder,
  name,
  value,
  required,
  onChange,
}: InputProps) => {
  return (
    <fieldset>
      <legend>{label}</legend>
      <input
        type={type}
        className="form-item"
        placeholder={placeholder}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        {...(required ? { required } : {})}
      />
    </fieldset>
  );
};

export default Input;
