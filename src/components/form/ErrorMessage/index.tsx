import { ReactNode } from 'react';
import { styled } from 'styled-components';
import { colors } from '../../../styles';

type ErrorMessageProps = {
  children?: ReactNode;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ children }) => {
  return <S.ErrorMessage>{children}</S.ErrorMessage>;
};

const S = {
  ErrorMessage: styled.div`
    color: ${colors.semantic.danger};
  `,
};

export default ErrorMessage;
