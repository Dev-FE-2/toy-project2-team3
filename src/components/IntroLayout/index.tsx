import { FC, ReactNode } from 'react';
import { styled } from 'styled-components';
import IntroSideVisual from './IntroSideVisual';

interface IntroLayoutProps {
  children: ReactNode;
}

const IntroLayout: FC<IntroLayoutProps> = ({ children }) => {
  return (
    <S.IntroWrapper>
      <IntroSideVisual />
      <main>{children}</main>
    </S.IntroWrapper>
  );
};

const S = {
  IntroWrapper: styled.div`
    display: flex;
    height: 100vh;

    & > * {
      flex: 1;
    }

    @media (max-width: 768px) {
      flex-direction: column;
    }
  `,
};

export default IntroLayout;
