import React, { ReactNode } from 'react';
import { styled } from 'styled-components';
import { padding, font } from '../../styles';

type PageTitleProps = {
  children: ReactNode;
};

const PageTitle: React.FC<PageTitleProps> = ({ children }) => {
  return <S.TitleHeadline>{children}</S.TitleHeadline>;
};

const S = {
  TitleHeadline: styled.h1`
    font-size: ${font.size.headingLight};
    line-height: 1;
    font-weight: ${font.weight.headingLight};
    margin-bottom: ${padding.md};
    text-align: center;
  `,
};

export default PageTitle;
