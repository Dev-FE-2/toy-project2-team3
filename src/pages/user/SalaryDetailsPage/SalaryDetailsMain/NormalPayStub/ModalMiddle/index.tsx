import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../../../../styles';
import { Item } from '../../../SalaryDetailsMain/';

type MiddleProps = {
  item: Item;
};

const ModalMiddle: React.FC<MiddleProps> = ({ item }) => {
  // 총 지급액 계산
  const totalPayment = item.baseSalary + item.overtime + item.nightPay;

  // 실 수령액 계산
  const netPayment = totalPayment * 0.9;

  return (
    <S.ModalMiddle>
      <S.ModalMiddleRow>
        <div className="title__key">입금 항목</div>
        <div className="title__value">지급 금액(원)</div>
        <div className="title__value">근무 시간</div>
        <div className="title__value" />
      </S.ModalMiddleRow>
      <S.ModalMiddleRow>
        <div className="title__key">
          <S.ModalMiddleRow>
            <S.ModalMiddleColumn>
              <S.MonthContainer>
                매월
                <br /> 지급
              </S.MonthContainer>
              <S.otherMonthContainer>
                격월 또는
                <br /> 부정기
                <br /> 지급
              </S.otherMonthContainer>
            </S.ModalMiddleColumn>
            {<div className="detail__key"></div>}
            <div className="detail__value">기본급</div>
          </S.ModalMiddleRow>
        </div>
        <div className="title__value">
          <div className="value">{item.baseSalary.toLocaleString()}원</div>
        </div>
        <div className="title__value">{item.baseWorkingHours}시간</div>
        <div className="title__value" />
      </S.ModalMiddleRow>
      <S.ModalMiddleRow>
        <div className="title__key">
          <S.ModalMiddleRow>
            <div className="detail__key"></div>
            <div className="detail__value">연장근로수당</div>
          </S.ModalMiddleRow>
        </div>
        <div className="title__value">
          <div className="value">{item.overtime.toLocaleString()}원</div>
        </div>
        <div className="title__value">{item.overtimeHours}시간</div>
        <div className="title__value" />
      </S.ModalMiddleRow>
      <S.ModalMiddleRow>
        <div className="title__key">
          <S.ModalMiddleRow>
            <div className="detail__key"></div>
            <div className="detail__value">야간근로수당</div>
          </S.ModalMiddleRow>
        </div>
        <div className="title__value">
          <div className="value">{item.nightPay.toLocaleString()}원</div>
        </div>
        <div className="title__value">{item.nightWorkingHours}시간</div>
        <div className="title__value" />
      </S.ModalMiddleRow>
      <S.ModalMiddleRow>
        <div className="title__key">
          <S.ModalMiddleRow>
            <div className="detail__key"></div>
            <div className="detail__value"></div>
          </S.ModalMiddleRow>
        </div>
        <div className="title__value"></div>
        <div className="title__value"></div>
        <div className="title__value" />
      </S.ModalMiddleRow>
      <S.ModalMiddleRow>
        <div className="title__key">
          <S.ModalMiddleRow>
            <div className="detail__key"></div>
            <div className="detail__value"></div>
          </S.ModalMiddleRow>
        </div>
        <div className="title__value"></div>
        <div className="title__value"></div>
        <div className="title__value" />
      </S.ModalMiddleRow>
      <S.ModalMiddleRow>
        <div className="title__key">
          <S.ModalMiddleRow>
            <div className="detail__key"></div>
            <div className="detail__value"></div>
          </S.ModalMiddleRow>
        </div>
        <div className="title__value"></div>
        <div className="title__value"></div>
        <div className="title__value" />
      </S.ModalMiddleRow>
      <S.ModalMiddleRow>
        <div className="title__key">
          <S.ModalMiddleRow>
            <div className="detail__key"></div>
            <div className="detail__value"></div>
          </S.ModalMiddleRow>
        </div>
        <div className="title__value"></div>
        <div className="title__value"></div>
        <div className="title__value" />
      </S.ModalMiddleRow>

      <S.ModalMiddleRow>
        <div className="title__key">지급액 계</div>
        <div className="title__value">
          <div className="value">{totalPayment.toLocaleString()}원</div>
        </div>{' '}
        <div className="title__value">총 근무 시간</div>{' '}
        <div className="title__value">
          {item.baseWorkingHours + item.overtimeHours + item.nightWorkingHours}
          시간
        </div>
      </S.ModalMiddleRow>

      <S.ModalMiddleRow>
        <S.ModalMiddleWrapper />
        <div className="title__value">실 수령액 (원)</div>
        <div className="title__value">
          <div className="value">
            {Math.floor(netPayment).toLocaleString()}원
          </div>
        </div>
      </S.ModalMiddleRow>
    </S.ModalMiddle>
  );
};

const S = {
  ModalMiddle: styled.div`
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
`,

  MonthContainer: styled.div`
    min-width: 3.4vw;
    min-height: 16vh;
    border: 1px solid ${colors.semantic.border};
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  `,

  otherMonthContainer: styled.div`
    min-height: 12vh;
    border: 1px solid ${colors.semantic.border};
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  `,

  ModalMiddleRow: styled.div`
    display: flex;
    flex-direction: row;
  `,
  ModalMiddleColumn: styled.div`
    display: flex;
    flex-direction: column;
  `,
  ModalMiddleWrapper: styled.div`
    min-width: 50%;
    min-height: 10%;
    background-color: ${colors.semantic.background.dark};
  `,
};
export default ModalMiddle;
