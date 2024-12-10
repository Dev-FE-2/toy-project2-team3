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
    title: '2024년 9월 급여 정산 오류',
    status: '승인',
    reason: '',
  },
  {
    id: 2,
    date: '2024-09-25',
    title: '2024년 8월 급여 정산 오류',
    status: '거부',
    reason: '돈이 없어요',
  },
];

const SalaryCorrectionList = () => {
  return (
    <>
      <S.SalrayContainer>
        <S.SalraySelectContainer>
          <S.SalarayNormal>
            <p>날짜</p>
          </S.SalarayNormal>
          <S.SalarayNormal>
            <p>제목</p>
          </S.SalarayNormal>
          <S.SalaryCenter>
            <p>처리상태</p>
          </S.SalaryCenter>
          <S.SalaryCenter>
            <p>거절 사유</p>
          </S.SalaryCenter>
        </S.SalraySelectContainer>
        <S.ListContainer>
          {items.map((item) => (
            <S.SalaryItemContainer key={item.id}>
              <S.SalarayNormal>
                <span>{item.date}</span>
              </S.SalarayNormal>
              <S.SalarayNormal>
                <span>{item.title}</span>
              </S.SalarayNormal>
              <S.SalaryCenter>
                {item.status === '승인' ? (
                  <S.StatusApprove>승인</S.StatusApprove>
                ) : item.status === '거부' ? (
                  <S.StatusReject>거부</S.StatusReject>
                ) : (
                  <S.StatusProcessing>처리 전</S.StatusProcessing>
                )}
              </S.SalaryCenter>
              <S.SalaryCenter>
                <span>{item.reason}</span>
              </S.SalaryCenter>
            </S.SalaryItemContainer>
          ))}
        </S.ListContainer>
      </S.SalrayContainer>
    </>
  );
};

const S = {
  SalrayContainer: styled.div`
    width: 71.35vw;
    height: 57.5vh;
    margin-left: 5.5vw;
    margin-top: 2vh;
    border: solid 1px black;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  SalraySelectContainer: styled.div`
    width: 90%;
    display: flex;
    flex-direction: row;
    margin: 2vh 3vw;
  `,
  SalaryItemContainer: styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 1vw;
    margin-top: 2vh;
  `,
  SalarayNormal: styled.div`
    width: 20.83vw;
    height: 3.7vh;
    font-size: 24px;
    display: flex;
    span {
      margin-right: 20px;
    }
  `,
  SalaryCenter: styled.div`
    width: 17.71vw;
    height: 3.7vh;
    font-size: 24px;
    display: flex;
    justify-content: center; /* 수평 중앙 정렬 */
    align-items: center; /* 수직 중앙 정렬 */

    span {
      margin-left: 2vw;
    }
  `,
  ListContainer: styled.div`
    width: 90%;
    border-top: 1px solid ${colors.semantic.border};

    margin-left: 18vw;
    margin-right: 20vw;
  `,
  StatusProcessing: styled.div`
    margin-left: 1vw;
    background-color: ${colors.semantic.success};
    color: ${colors.semantic.text.light};
    width: 5vw;
    height: 4vh;
    border-radius: 16px;
    font-size: ${font.size.paragraph};
    font-weight: normal;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  StatusReject: styled.div`
    margin-left: 1vw;
    background-color: ${colors.semantic.danger};
    color: ${colors.semantic.text.light};
    font-size: ${font.size.paragraph};
    font-weight: normal;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 5vw;
    height: 4vh;
    border-radius: 16px;
  `,
  StatusApprove: styled.div`
    margin-left: 1vw;
    background-color: ${colors.semantic.primary};
    color: ${colors.semantic.text.light};
    font-size: ${font.size.paragraph};
    font-weight: normal;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 5vw;
    height: 4vh;
    border-radius: 16px;
  `,
};

export default SalaryCorrectionList;
