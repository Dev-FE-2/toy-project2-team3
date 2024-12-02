import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import SideBarTop from '../SideBarTop';
import SideBarMiddle from '../SideBarMiddle';
import SideBarBottom from '../SideBarBottom';

const Container = styled.div`
  display: flex; 
`;

const StyledSideBar = styled.div`
  position: relative;
  width: 16.67vw;
  height: 100vh; 
  padding-left: 20px;
  padding-right: 20px;
  overflow: hidden; // 자식 요소가 넘치지 않도록 설정
`;

const SideBar = () => {
  return (
    <Container>
      <StyledSideBar>
        <SideBarTop />
        <SideBarMiddle />
        <SideBarBottom /> {/* SideBarBottom이 맨 아래에 위치 */}
      </StyledSideBar>
      <Outlet /> {/* 메인 콘텐츠 */}
    </Container>
  );
}

export default SideBar;
