import styled from 'styled-components';
import { border, padding } from '../../../styles';
import BrandLogo from './BrandLogo';
import Navigation from './Navigation';
import UserStatus from './UserStatus';

const SideBar = () => {
  return (
    <S.SideBar>
      <BrandLogo style={{ padding: padding.md }} />
      <Navigation style={{ padding: padding.md }} />
      <UserStatus style={{ padding: padding.md }} />
    </S.SideBar>
  );
};

const S = {
  SideBar: styled.aside`
    height: 100vh;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: ${border.default};
  `,
};

export default SideBar;
