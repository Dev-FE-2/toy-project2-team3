import { ReactNode } from 'react';
import { styled } from 'styled-components';
import { padding, colors, font, border } from '../../../styles';

type FormProps = {
  children: ReactNode;
};

const Form: React.FC<FormProps> = ({ children }) => {
  return <S.Form>{children}</S.Form>;
};

const S = {
  Form: styled.div`
    padding: ${padding.lg} ${padding.md};
    display: flex;
    flex-direction: column;
    gap: ${padding.sm};
    margin: 0 auto;
    width: 100%;
    max-width: 360px;

    .button-wrap {
      display: flex;
      gap: ${padding.sm};
      width: 100%;
      max-width: 360px;
    }

    .button-wrap > * {
      flex: 1;
    }

    @media (max-width: 1024px) {
      &,
      .button-wrap {
        max-width: 100%;
      }
    }

    .button {
      height: 50px;
      line-height: 1;
      border-radius: ${border.radius.xs};
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: ${font.size.paragraph};
      color: ${colors.semantic.light};
      font-weight: 500;

      &.primary {
        background-color: ${colors.semantic.primary};
      }

      &.secondary {
        background-color: ${colors.semantic.secondary};
      }

      &.danger {
        background-color: ${colors.semantic.danger};
      }
    }
  `,
};

export default Form;
