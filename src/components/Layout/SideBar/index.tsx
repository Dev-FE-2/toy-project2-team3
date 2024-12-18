import styled from 'styled-components';
import { border, padding, colors } from '../../../styles';
import BrandLogo from './BrandLogo';
import Navigation from './Navigation';
import UserStatus from './UserStatus';

const SideBar = () => {
  return (
    <S.SideBar>
      <BrandLogo style={{ padding: padding.lg }} />
      <Navigation style={{ padding: padding.lg }} />
      <UserStatus style={{ padding: padding.lg }} />
    </S.SideBar>
  );
};

const S = {
  SideBar: styled.aside`
    height: 100vh;
    min-width: 280px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: ${border.default};
    color: ${colors.semantic.text.nav};
  `,
};

export default SideBar;
