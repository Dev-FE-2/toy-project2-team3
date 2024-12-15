import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { padding, font } from '../../styles';
import { default as SideBar } from './SideBar';
// import { PageContainer, PageTitle } from "../../components";

const Layout = () => {
  return (
    <S.Layout>
      <SideBar />
      <main>
        <section className="page-container">
          <h1 className="page-title">타이틀</h1>
          <Outlet /> {/* 메인 콘텐츠 */}
        </section>
      </main>
    </S.Layout>
  );
};

const S = {
  Layout: styled.div`
    display: flex;

    main {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;

      .page-container {
        width: 100%;
        max-width: 1400px;
        padding: ${padding.xl} ${padding.md};
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: ${padding.xl};

        @media (max-width: 768px) {
        }
      }

      .page-title {
        font-size: ${font.size.heading};
        line-height: 1;
        font-weight: ${font.weight.heading};
      }
    }
  `,
};

export default Layout;
