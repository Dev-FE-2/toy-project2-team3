import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLogout } from '../../../hooks';
import { hexToRgba } from '../../../utils';
import { URL } from '../../../constant';
import { colors, padding } from '../../../styles';
import { Icon } from '../../../components';

type NavItem = {
  icon: string;
  text: string;
  link: string;
  name: string;
  hasSubNav: boolean;
  firstSubNav: string;
  isSubNav: boolean;
  parentNav: string;
  iconSize?: number;
};

const getNavItems = (
  navItem: Pick<NavItem, 'text' | 'link' | 'name'>,
  {
    hasSubNav,
    firstSubNav,
    isSubNav,
    parentNav,
    icon,
    iconSize,
  }: Omit<NavItem, 'text' | 'link' | 'name'>
) => ({
  ...navItem,
  hasSubNav,
  firstSubNav,
  isSubNav,
  parentNav,
  icon,
  iconSize,
});

const navItems = [
  getNavItems(URL.userHome, {
    hasSubNav: false,
    firstSubNav: '',
    isSubNav: false,
    parentNav: '',
    icon: 'home',
  }),
  getNavItems(URL.profile, {
    hasSubNav: false,
    firstSubNav: '',
    isSubNav: false,
    parentNav: '',
    icon: 'person',
  }),
  getNavItems(URL.schedule, {
    hasSubNav: false,
    firstSubNav: '',
    isSubNav: false,
    parentNav: '',
    icon: 'calendar_today',
    iconSize: 22,
  }),
  getNavItems(URL.salary, {
    hasSubNav: true,
    firstSubNav: `${URL.salaryDetails.link}`,
    isSubNav: false,
    parentNav: '',
    icon: 'attach_money',
  }),
  getNavItems(URL.salaryDetails, {
    hasSubNav: false,
    firstSubNav: '',
    isSubNav: true,
    parentNav: `${URL.salary.link}`,
    icon: '',
  }),
  getNavItems(URL.salaryCorrection, {
    hasSubNav: false,
    firstSubNav: '',
    isSubNav: true,
    parentNav: `${URL.salary.link}`,
    icon: '',
  }),
];

const Navigation = ({ style }: { style: { padding: string } }) => {
  const navigate = useNavigate();
  const { handleLogout } = useLogout();
  const [isToggle, setToggle] = useState(true);

  const handleToggle = (firstSubNav: string) => {
    setToggle(!isToggle);
    navigate(firstSubNav);
  };

  return (
    <S.Navigation padding={style.padding}>
      {navItems.map((navItem) =>
        navItem.hasSubNav ? (
          <S.NavItem
            onClick={() => handleToggle(navItem.firstSubNav)}
            className={`has-sub-nav${isToggle ? ' selected' : ''}`}
            isToggle={isToggle}
          >
            <NavText
              text={navItem.text}
              icon={navItem.icon}
              iconSize={navItem.iconSize}
            />
            <Icon name="keyboard_arrow_down" />
          </S.NavItem>
        ) : !navItem.isSubNav ? (
          <S.NavItem as={NavLink} to={navItem.link}>
            <NavText
              text={navItem.text}
              icon={navItem.icon}
              iconSize={navItem.iconSize}
            />
          </S.NavItem>
        ) : isToggle ? (
          <S.NavItem as={NavLink} to={navItem.link} className="sub-nav">
            <NavText
              text={navItem.text}
              icon={navItem.icon}
              iconSize={navItem.iconSize}
            />
          </S.NavItem>
        ) : (
          <></>
        )
      )}
      <hr />
      <S.NavItem onClick={handleLogout}>Log out</S.NavItem>
    </S.Navigation>
  );
};

const NavText = ({
  text,
  icon,
  iconSize,
}: {
  text: string;
  icon: string;
  iconSize?: number;
}) => {
  return (
    <S.NavText>
      {icon && <Icon name={icon} size={iconSize} />}
      {text}
    </S.NavText>
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
  NavItem: styled.div<{ isToggle?: boolean }>`
    height: 44px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: color ease 0.2s;

    &.active {
      color: ${colors.semantic.primary};
    }

    &:hover {
      color: ${colors.semantic.hover.primary};
    }

    &.sub-nav {
      margin-left: ${padding.lg};
    }

    &.has-sub-nav {
      display: flex;
      justify-content: space-between;
    }

    ${(props) =>
      props.isToggle &&
      `
      .material-symbols-outlined {
        transform: rotate(180deg);
      }      
    `}

    &.has-sub-nav.selected {
      background-color: ${hexToRgba(colors.semantic.primary, 0.05)};
      border-right: 3px solid ${colors.semantic.primary};
    }

    .nav-text {
    }
  `,
  NavText: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${padding.sm};
  `,
};

export default Navigation;
