import { ChangeEvent } from 'react';

interface TextareaProps {
  label: string;
  type: string;
  placeholder: string;
  name: string;
  value: string;
  required?: boolean;
  rows?: number;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea = ({
  label,
  placeholder,
  name,
  rows = 3,
  required,
  value,
  onChange,
}: TextareaProps) => {
  return (
    <fieldset>
      <legend>{label}</legend>
      <textarea
        className="form-item"
        placeholder={placeholder}
        id={name}
        name={name}
        value={value}
        rows={rows}
        onChange={onChange}
        {...(required ? { required } : {})}
      ></textarea>
    </fieldset>
  );
};

export default Textarea;
