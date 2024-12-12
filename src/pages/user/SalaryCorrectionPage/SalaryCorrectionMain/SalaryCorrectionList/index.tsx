import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../../../../styles';
import PagiNation from '../../../../../components/Pagination';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../state/store';

type Item = {
  id: number;
  date: string;
  title: string;
  status: string;
  reason: string;
};
const items: Item[] = [
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
  {
    id: 3,
    date: '2024-09-25',
    title: '2024년 08월 급여 정산 오류',
    status: '승인',
    reason: '',
  },
  {
    id: 4,
    date: '2024-09-25',
    title: '2024년 08월 급여 정산 오류',
    status: '승인',
    reason: '',
  },
  {
    id: 5,
    date: '2024-09-25',
    title: '2024년 08월 급여 정산 오류',
    status: '승인',
    reason: '',
  },
  {
    id: 6,
    date: '2024-09-25',
    title: '2024년 08월 급여 정산 오류',
    status: '승인',
    reason: '',
  },
  {
    id: 7,
    date: '2024-09-25',
    title: '2024년 08월 급여 정산 오류',
    status: '승인',
    reason: '',
  },
  {
    id: 8,
    date: '2024-09-25',
    title: '2024년 08월 급여 정산 오류',
    status: '승인',
    reason: '',
  },
  {
    id: 9,
    date: '2024-09-25',
    title: '2024년 08월 급여 정산 오류',
    status: '승인',
    reason: '',
  },
  {
    id: 10,
    date: '2024-09-25',
    title: '2024년 08월 급여 정산 오류',
    status: '승인',
    reason: '',
  },
  {
    id: 11,
    date: '2024-09-25',
    title: '2024년 08월 급여 정산 오류',
    status: '승인',
    reason: '',
  },
];

const SalaryCorrectionList = () => {
  const ITEMPERPAGE = 10;
  const [currentPageItems, setCurrentPageItems] = useState<Item[]>([]);

  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage
  );

  useEffect(() => {
    const indexOfLastItem = currentPage * ITEMPERPAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMPERPAGE;
    const currentItemsSlice = items.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentPageItems(currentItemsSlice);
  }, [currentPage]);

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
        {currentPageItems.map((item) => (
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
      <S.PaginationContainer>
        <PagiNation maxPage={2} />
      </S.PaginationContainer>
    </S.SalaryContainer>
  );
};

const S = {
  SalaryContainer: styled.div`
    width: 70vw;
    height: 70vh;
    margin-left: 7vw;
    margin-top: 2vh;
    border: 1px solid ${colors.semantic.text.gray};
    display: flex;
    flex-direction: column;
    align-items: center;
    .item-ceil {
      width: 24vw;
      height: 3.7vh;
      display: flex;
      flex-direction: column;
      align-items: center;
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
    width: 100%;
    min-height: 9%;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: ${colors.semantic.background.light};
    font-weight: 700;
    margin-bottom: 2vh;
  `,
  SalaryMainContainer: styled.div`
    width: 100%;
    min-height: 7.8%;
    margin-left: 6vw;
    margin-right: 6vw;
    cursor: pointer;
    justify-content: center;
    align-items: center;

    .salary__item-container {
      display: flex;
      flex-direction: row;
      margin-bottom: 2vh;
      &:hover {
        background-color: ${colors.semantic.hover.primary};
      }
      &:active {
        background-color: ${colors.semantic.primary};
      }
    }
    .status {
      color: ${colors.semantic.text.light};
      width: 3vw;
      height: 3vh;
      border-radius: 16px;
      font-size: 12px;
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

  PaginationContainer: styled.div`
    margin-top: auto;
    padding: 1rem;
  `,
};

export default SalaryCorrectionList;
