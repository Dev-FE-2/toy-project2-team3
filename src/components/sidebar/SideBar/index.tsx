import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import SideBarTop from '../SideBarTop';
import SideBarMiddle from '../SideBarMiddle';
import SideBarBottom from '../SideBarBottom';

const StyledSideBarContainer = styled.div`
  display: flex; 
`;

const StyledSideBar = styled.div`
  position: relative;
  width: 16.67vw;
  height: 100vh; 
  padding: 0 1vw;
  overflow: hidden;
  border-right: 0.7px solid #91918B
`;

const SideBar = () => {
  return (
    <StyledSideBarContainer>
      <StyledSideBar>
        <SideBarTop />
        <SideBarMiddle />
        <SideBarBottom />
      </StyledSideBar>
      <Outlet /> {/* 메인 콘텐츠 */}
    </StyledSideBarContainer>
  );
}

export default SideBar;
