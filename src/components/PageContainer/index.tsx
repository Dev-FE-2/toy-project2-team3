import React, { ReactNode } from 'react';
import { styled } from 'styled-components';
import { padding } from '../../styles';

type PageContainerProps = {
  children: ReactNode;
};

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return <S.Section>{children}</S.Section>;
};

const S = {
  Section: styled.section`
    padding: ${padding.xl} ${padding.md};
  `,
};

export default PageContainer;
