import { useState, ChangeEvent } from 'react';
import { styled } from 'styled-components';
import { padding, border, colors } from '../../../styles';
import { REG_EXP } from '../../../constant';
import ErrorMessage from '../ErrorMessage';

interface InputProps {
  label: string;
  type: string;
  placeholder: string;
  name: keyof typeof REG_EXP & string; // & 교차 타입의 결과는 두 타입의 공통집합으로 계산
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
  const regExp = REG_EXP[name];
  const [message, setMessage] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    if (regExp) {
      const { pattern, message } = regExp;
      const regex = new RegExp(pattern);

      if (!regex.test(inputValue)) {
        setMessage(message);
      } else {
        setMessage('');
      }
    }

    onChange(event);
  };

  return (
    <S.Fieldset>
      <legend>{label}</legend>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        id={name}
        value={value}
        pattern={regExp.pattern}
        onChange={handleInputChange}
        {...(required ? { required } : {})}
      />
      <ErrorMessage>{message}</ErrorMessage>
    </S.Fieldset>
  );
};

const S = {
  Fieldset: styled.fieldset`
    legend {
      position: absolute;
      opacity: 0;
    }

    input {
      width: 100%;
      height: 40px;
      line-height: 1;
      padding: 0 ${padding.md};
      border: ${border.default};
      border-radius: ${border.radius.xs};

      &:focus-visible {
        outline-color: ${colors.semantic.hover.primary};
      }

      &:valid {
        border-color: ${colors.semantic.border};
      }

      &:invalid:placeholder-shown {
        border-color: ${colors.semantic.border};
      }

      &:invalid {
        border-color: ${colors.semantic.danger};
      }
    }
  `,
};

export default Input;
