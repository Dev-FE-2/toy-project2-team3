import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../../../../styles';

const StyledModalHeader = styled.div`
  height: 15%;
  background-color: black;
  font-size: 20px;
  text-align: center; /* 텍스트 가운데 정렬 */

  .key {
    width: 20%;
    background-color: #fff;
    border: 1px solid ${colors.semantic.text.gray};
    min-height: 6vh;
    display: flex; /* Flexbox 사용 */
    align-items: center; /* 세로 가운데 정렬 */
    justify-content: center; /* 가로 가운데 정렬 */
    text-align: center; /* 텍스트 가운데 정렬 */
  }

  .value {
    width: 30%;
    background-color: #fff;
    border: 1px solid ${colors.semantic.text.gray};
    display: flex; /* Flexbox 사용 */
    align-items: center; /* 세로 가운데 정렬 */
    justify-content: center; /* 가로 가운데 정렬 */
    text-align: center; /* 텍스트 가운데 정렬 */
    color: #4b89dc;
  }
`;

const StyledModalHeaderRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const ModalHeader = () => {
  return (
    <StyledModalHeader>
      <StyledModalHeaderRow>
        <div className="key">성명</div>
        <div className="value">홍길동</div>
        <div className="key">사번</div>
        <div className="value">073542</div>
      </StyledModalHeaderRow>
      <StyledModalHeaderRow>
        <div className="key">부서</div>
        <div className="value">개발지원팀</div>
        <div className="key">직급</div>
        <div className="value">팀장</div>
      </StyledModalHeaderRow>
    </StyledModalHeader>
  );
};

export default ModalHeader;
