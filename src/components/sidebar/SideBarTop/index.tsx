import React from 'react';
import styled from 'styled-components';

const StyledSideBarTop = styled.div`
    display: flex; /* 플렉스 박스를 사용하여 이미지와 텍스트를 가로로 배치 */
    align-items: center; /* 수직 중앙 정렬 */
    color: #63A002; /* 텍스트 색상 */
    font-weight: bold; /* 글씨 진하게 */
    font-size: 24px; /* 글씨 크기 */
    text-align: left; /* 왼쪽 정렬 */
    height: 15vh;
    border-bottom: 1px solid #63A002; /* 아래쪽 실선 추가 */
    margin-bottom: 3vh;

    img {
        width: 40px; /* 이미지 너비 */
        height: auto; /* 비율 유지 */
        margin-right: 2vh; /* 이미지와 텍스트 간의 간격 */
    }
`;

const SideBarTop = () => {
  return (
    <StyledSideBarTop>
      <img src="/assets/PokemonLogo.png" alt="Pokemon Logo" />
      Pokemon ERP
    </StyledSideBarTop>
  );
}

export default SideBarTop;
