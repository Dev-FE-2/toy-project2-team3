import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../../../../styles';

const StyledModalMiddle = styled.div`
    height: 53%;
    .title__key,
    .title__value,
    .detail__value {
        height: 4vh;
    }

    .detail__key{
        height:4vh;
        border: none;
        
    }

    .title__key {
        width: 25%;
        text-align: center;
    }
.title__value {
    width: 25%;
    border: 1px solid ${colors.semantic.border};
    text-align:center; 
    .value{
    color: #4B89DC;
    
    }

}

    .detail__key {
        width: 40%;
         border-top: none;
         text-align:center;
        
    }
    .detail__value {
        min-width: 62%;
        border: 1px solid ${colors.semantic.border};
        text-align:center;
    }
    }
`;

const StyledModaltempOne = styled.div`
  min-width: 3.4vw;
  min-height: 16vh;
  border: 1px solid ${colors.semantic.border};
  display: flex; /* Flexbox를 사용하여 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  justify-content: center; /* 수평 가운데 정렬 */
  text-align: center; /* 텍스트 가운데 정렬 */
`;

const StyledModaltempTwo = styled.div`
  min-height: 12vh;
  border: 1px solid ${colors.semantic.border};
  display: flex; /* Flexbox를 사용하여 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  justify-content: center; /* 수평 가운데 정렬 */
  text-align: center; /* 텍스트 가운데 정렬 */
`;

const StyledModalMiddleRow = styled.div`
  display: flex;
  flex-direction: row;
`;
const StyledModalMiddleColumn = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledModalMiddleTemp = styled.div`
  min-width: 50%;
  min-height: 10%;
  background-color: ${colors.semantic.background.dark};
`;

const ModalMiddle = () => {
  return (
    <StyledModalMiddle>
      <StyledModalMiddleRow>
        <div className="title__key">입금 항목</div>
        <div className="title__value">지급 금액(원)</div>
        <div className="title__value">근무 시간</div>
        <div className="title__value" />
      </StyledModalMiddleRow>
      <StyledModalMiddleRow>
        <div className="title__key">
          <StyledModalMiddleRow>
            <StyledModalMiddleColumn>
              <StyledModaltempOne>
                매월
                <br /> 지급
              </StyledModaltempOne>
              <StyledModaltempTwo>
                격월 또는
                <br /> 부정기
                <br /> 지급
              </StyledModaltempTwo>
            </StyledModalMiddleColumn>
            {<div className="detail__key"></div>}
            <div className="detail__value">기본급</div>
          </StyledModalMiddleRow>
        </div>
        <div className="title__value">
          <div className="value">3,200,000</div>
        </div>
        <div className="title__value">40시간</div>
        <div className="title__value" />
      </StyledModalMiddleRow>
      <StyledModalMiddleRow>
        <div className="title__key">
          <StyledModalMiddleRow>
            <div className="detail__key"></div>
            <div className="detail__value">연장근로수당</div>
          </StyledModalMiddleRow>
        </div>
        <div className="title__value">
          <div className="value">379,728</div>
        </div>
        <div className="title__value">10시간</div>
        <div className="title__value" />
      </StyledModalMiddleRow>
      <StyledModalMiddleRow>
        <div className="title__key">
          <StyledModalMiddleRow>
            <div className="detail__key"></div>
            <div className="detail__value">야간근로수당</div>
          </StyledModalMiddleRow>
        </div>
        <div className="title__value">
          <div className="value">15,822</div>
        </div>
        <div className="title__value">5시간</div>
        <div className="title__value" />
      </StyledModalMiddleRow>
      <StyledModalMiddleRow>
        <div className="title__key">
          <StyledModalMiddleRow>
            <div className="detail__key"></div>
            <div className="detail__value"></div>
          </StyledModalMiddleRow>
        </div>
        <div className="title__value"></div>
        <div className="title__value"></div>
        <div className="title__value" />
      </StyledModalMiddleRow>
      <StyledModalMiddleRow>
        <div className="title__key">
          <StyledModalMiddleRow>
            <div className="detail__key"></div>
            <div className="detail__value"></div>
          </StyledModalMiddleRow>
        </div>
        <div className="title__value"></div>
        <div className="title__value"></div>
        <div className="title__value" />
      </StyledModalMiddleRow>
      <StyledModalMiddleRow>
        <div className="title__key">
          <StyledModalMiddleRow>
            <div className="detail__key"></div>
            <div className="detail__value"></div>
          </StyledModalMiddleRow>
        </div>
        <div className="title__value"></div>
        <div className="title__value"></div>
        <div className="title__value" />
      </StyledModalMiddleRow>
      <StyledModalMiddleRow>
        <div className="title__key">
          <StyledModalMiddleRow>
            <div className="detail__key"></div>
            <div className="detail__value"></div>
          </StyledModalMiddleRow>
        </div>
        <div className="title__value"></div>
        <div className="title__value"></div>
        <div className="title__value" />
      </StyledModalMiddleRow>

      <StyledModalMiddleRow>
        <div className="title__key">지급액 계</div>
        <div className="title__value">
          <div className="value">3,940,482</div>
        </div>{' '}
        <div className="title__value">총 근무 시간</div>{' '}
        <div className="title__value">55시간</div>
      </StyledModalMiddleRow>

      <StyledModalMiddleRow>
        <StyledModalMiddleTemp />
        <div className="title__value">실 수령액 (원)</div>
        <div className="title__value">
          <div className="value">3,472,161</div>
        </div>
      </StyledModalMiddleRow>
    </StyledModalMiddle>
  );
};

export default ModalMiddle;
