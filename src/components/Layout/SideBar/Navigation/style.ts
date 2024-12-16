import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { padding, colors, border } from '../../../../styles';
import type { BaseContainerProps, NavigationProps } from './type';

// 공통 CSS 스타일 정의
const navItemCSS = css<BaseContainerProps>`
  display: flex;
  align-items: center;
  gap: ${padding.sm};
  padding: ${padding.sm};
  border-radius: ${border.radius.sm};
  color: ${(props) =>
    props.isActive ? colors.semantic.text.light : colors.semantic.text.dark};
  background-color: ${(props) =>
    props.isActive
      ? colors.semantic.primary
      : props.isHovered
        ? colors.semantic.hover.primary
        : colors.semantic.light};
  font-weight: bold;
  text-align: left;
  transition: background-color 0.3s;
`;

const S = {
  Navigation: styled.nav<NavigationProps['style']>`
    flex: 1;
    padding: ${padding.lg} ${(props) => props.padding};
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.padding};
  `,
  Link: styled(Link)`
    text-decoration: none;
  `,
  MainNavItem: styled.div<BaseContainerProps>`
    ${navItemCSS}
    font-size: 20px;

    .material-symbols-outlined {
      font-size: 24px; /* 아이콘 크기 조절 */
      filter: ${(props) =>
        props.isActive ? 'brightness(0) invert(1)' : 'none'};
    }

    .arrow {
      margin-left: auto;
      display: ${(props) => (props.isActive ? 'block' : 'none')};
    }
  `,
  SubNavItem: styled.div<BaseContainerProps>`
    ${navItemCSS}
    /* width: 13vw; */
    padding-left: 1vw;
    font-size: 14px;
    height: 4vh;
    margin-bottom: 0.5vh;
  `,
  SubNavWrapper: styled.div`
    border-left: 1.5px solid ${colors.semantic.primary};
    margin-left: 1vh;
    padding-left: 0.5vw;
    display: flex;
    flex-direction: column;
  `,
};

export { S };
