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
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
      justify-content: flex-start;
    }
  `,
};

export default PageContainer;
