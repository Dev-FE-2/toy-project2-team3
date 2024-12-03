import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import BrandLogo from './BrandLogo';
import Navigation from './Navigation';
import UserStatus from './UserStatus';

const StyledSideBarContainer = styled.div`
  display: flex;
`;

const StyledSideBar = styled.div`
  position: relative;
  width: 16.67vw;
  height: 100vh;
  padding: 0 1vw;
  overflow: hidden;
  border-right: 0.7px solid #91918b;
`;

const SideBar = () => {
  return (
    <StyledSideBarContainer>
      <StyledSideBar>
        <BrandLogo />
        <Navigation />
        <UserStatus />
      </StyledSideBar>
      <Outlet /> {/* 메인 콘텐츠 */}
    </StyledSideBarContainer>
  );
};

export default SideBar;
