// import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useLogout } from '../../../hooks';
import { hexToRgba } from '../../../utils';
import { URL } from '../../../constant';
import { colors } from '../../../styles';

const navItems = [
  URL.userHome,
  URL.profile,
  URL.schedule,
  URL.salary,
  URL.salaryDetails,
  URL.salaryCorrection,
];

const Navigation = ({ style }: { style: { padding: string } }) => {
  const { handleLogout } = useLogout();

  return (
    <S.Navigation padding={style.padding}>
      {navItems.map((navItem) => (
        <S.NavItem as={NavLink} to={navItem.link}>
          {navItem.text}
        </S.NavItem>
      ))}
      <hr />
      <S.NavItem onClick={handleLogout}>Log out</S.NavItem>
    </S.Navigation>
  );
};

const S = {
  Navigation: styled.nav<{ padding: string }>`
    flex: 1;

    hr {
      border: none;
      border-top: 1px solid ${colors.semantic.border.light};
      margin: 20px 36px 19px;
    }

    & > * {
      padding: 0 ${(props) => props.padding};
    }
  `,
  NavItem: styled.div`
    height: 44px;
    display: flex;
    align-items: center;
    cursor: pointer;

    &.active {
      color: ${colors.semantic.primary};
    }

    &:hover {
      color: ${colors.semantic.hover.primary};
    }

    &.selected {
      background-color: ${hexToRgba(colors.semantic.primary, 0.05)};
      border-right: 3px solid ${colors.semantic.primary};
    }
  `,
};

export default Navigation;
