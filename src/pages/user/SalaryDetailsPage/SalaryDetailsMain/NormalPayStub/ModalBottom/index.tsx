import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../../../../styles';

const StyledModalBottom = styled.div`
  text-align: center;
`;

const StyledModalOne = styled.div`
  min-width: 25%;
  border: 1px solid ${colors.semantic.border};
  display: inline-block;

  .value {
    color: #4b89dc;
  }
`;

const StyledModalTwo = styled.div`
  min-width: 50%;
  min-height: 3.3vh;
  border: 0.5px solid ${colors.semantic.border};
  display: inline-flex;
  align-items: center;
  justify-content: center;

  .value {
    color: #4b89dc;
    white-space: nowrap;
  }
`;

const StyledModalBottomRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;
const ModalBottom = () => {
  return (
    <StyledModalBottom>
      <StyledModalBottomRow>
        <StyledModalOne>구분</StyledModalOne>
        <StyledModalTwo>산출식 또는 산출 방법</StyledModalTwo>
        <StyledModalOne>지급액 (원)</StyledModalOne>
      </StyledModalBottomRow>
      <StyledModalBottomRow>
        <StyledModalOne>연장근로수당</StyledModalOne>
        <StyledModalTwo>
          연장근로시간 수<div className="value">(16시간) x 15,822원 x 1.5</div>
        </StyledModalTwo>
        <StyledModalOne>
          <div className="value">379,728</div>
        </StyledModalOne>
      </StyledModalBottomRow>
      <StyledModalBottomRow>
        <StyledModalOne>야간근로수당</StyledModalOne>
        <StyledModalTwo>
          야간근로시간 수<div className="value">(2시간) x 15,822원 x 0.5</div>
        </StyledModalTwo>
        <StyledModalOne>
          <div className="value">15,822</div>
        </StyledModalOne>
      </StyledModalBottomRow>
      <StyledModalBottomRow>
        <StyledModalOne />
        <StyledModalTwo />
        <StyledModalOne />
      </StyledModalBottomRow>
    </StyledModalBottom>
  );
};

export default ModalBottom;
