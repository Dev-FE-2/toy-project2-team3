import React from 'react';
import styled from 'styled-components';
import { colors, font } from '../../../../../styles';

const items = [
  {
    id: 0,
    date: '2024-11-27',
    title: '2024년 10월 급여 정산 오류',
    status: '처리 전',
    reason: '',
  },
  {
    id: 1,
    date: '2024-10-25',
    title: '2024년 09월 급여 정산 오류',
    status: '승인',
    reason: '',
  },
  {
    id: 2,
    date: '2024-09-25',
    title: '2024년 08월 급여 정산 오류',
    status: '거부',
    reason: '돈이 없어요',
  },
];

const SalaryCorrectionList = () => {
  return (
    <S.SalaryContainer>
      <S.SalaryLabelContainer>
        <div className="item-ceil">
          <p>날짜</p>
        </div>
        <div className="item-ceil">
          <p>제목</p>
        </div>
        <div className="item-ceil align-center">
          <p>처리상태</p>
        </div>
        <div className="item-ceil align-center">
          <p>거절 사유</p>
        </div>
      </S.SalaryLabelContainer>
      <S.SalaryMainContainer>
        {items.map((item) => (
          <div className="salary__item-container" key={item.id}>
            <div className="item-ceil">
              <span>{item.date}</span>
            </div>
            <div className="item-ceil">
              <span>{item.title}</span>
            </div>
            <div className="item-ceil align-center">
              {item.status === '승인' ? (
                <div className="status approve">승인</div>
              ) : item.status === '거부' ? (
                <div className="status reject">거부</div>
              ) : (
                <div className="status processing">처리 전</div>
              )}
            </div>
            <div className="item-ceil align-center">
              <span>{item.reason}</span>
            </div>
          </div>
        ))}
      </S.SalaryMainContainer>
    </S.SalaryContainer>
  );
};

const S = {
  SalaryContainer: styled.div`
    width: 71.35vw;
    height: 57.5vh;
    margin-top: 2vh;
    margin-left: 5.5vw;
    border: solid 1px black;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 24px;
    .item-ceil {
      width: 24vw;
      height: 3.7vh;
    }
    .align-center {
      width: 17.71vw;
      height: 3.7vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `,
  SalaryLabelContainer: styled.div`
    width: 83%;
    display: flex;
    flex-direction: row;
    margin: 2vh 3vw;
  `,
  SalaryMainContainer: styled.div`
    width: 83%;
    margin-left: 6vw;
    border-top: 3px solid ${colors.semantic.border};
    margin-right: 6vw;
    .salary__item-container {
      display: flex;
      flex-direction: row;
      margin-top: 2vh;
    }
    .status {
      color: ${colors.semantic.text.light};
      width: 5vw;
      height: 4vh;
      border-radius: 16px;
      font-size: ${font.size.paragraph};
      font-weight: normal;
      display: flex;
      justify-content: center;
      align-items: center;
      &.approve {
        background-color: ${colors.semantic.success};
      }
      &.reject {
        background-color: ${colors.semantic.danger};
      }
      &.processing {
        background-color: ${colors.semantic.primary};
      }
    }
  `,
};

export default SalaryCorrectionList;
