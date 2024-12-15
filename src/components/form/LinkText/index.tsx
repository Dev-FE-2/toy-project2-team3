import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { colors } from '../../../styles';

type LinkTextProps = {
  children: ReactNode;
  linkTo: string;
};

const LinkText: FC<LinkTextProps> = ({ children, linkTo }) => {
  return (
    <S.LinkText>
      <Link to={linkTo}>{children}</Link>
    </S.LinkText>
  );
};

const S = {
  LinkText: styled.article`
    text-align: center;
    color: ${colors.semantic.neutral};
    margin-bottom: 24px;

    strong {
      font-weight: inherit;
      color: ${colors.semantic.primary};
    }
  `,
};

export default LinkText;
