import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
// import { colors, border } from "../../../styles";
import { default as SideBar } from './SideBar';

const Layout = () => {
  return (
    <S.Layout>
      <SideBar />
      <main>
        <Outlet /> {/* 메인 콘텐츠 */};
      </main>
    </S.Layout>
  );
};

const S = {
  Layout: styled.div`
    display: flex;
  `,
};

export default Layout;
