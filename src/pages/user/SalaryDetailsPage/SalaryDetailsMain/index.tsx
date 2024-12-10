import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../../../styles';
import PagiNation from '../../../../components/Pagination';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../state/store';

type Item = {
  id: number;
  date: string;
  totalTime: string;
  basicSalary: string;
  overSalary: string;
  totalSalary: string;
};

const items: Item[] = [
  {
    id: 0,
    date: '2024년 10월',
    totalTime: '168',
    basicSalary: '2,800,470',
    overSalary: '1,232,577',
    totalSalary: '4,033,047',
  },
  {
    id: 1,
    date: '2024년 11월',
    totalTime: '160',
    basicSalary: '2,600,300',
    overSalary: '1,100,500',
    totalSalary: '3,700,800',
  },
  {
    id: 2,
    date: '2024년 12월',
    totalTime: '176',
    basicSalary: '2,900,150',
    overSalary: '1,300,250',
    totalSalary: '4,200,400',
  },
  {
    id: 3,
    date: '2025년 01월',
    totalTime: '180',
    basicSalary: '3,000,000',
    overSalary: '1,500,000',
    totalSalary: '4,500,000',
  },
  {
    id: 4,
    date: '2025년 02월',
    totalTime: '168',
    basicSalary: '2,750,600',
    overSalary: '1,250,300',
    totalSalary: '4,000,900',
  },
  {
    id: 5,
    date: '2025년 03월',
    totalTime: '160',
    basicSalary: '2,980,400',
    overSalary: '1,100,200',
    totalSalary: '4,080,600',
  },
  {
    id: 6,
    date: '2025년 04월',
    totalTime: '176',
    basicSalary: '2,850,750',
    overSalary: '1,300,500',
    totalSalary: '4,151,250',
  },
  {
    id: 7,
    date: '2025년 05월',
    totalTime: '180',
    basicSalary: '3,100,200',
    overSalary: '1,400,300',
    totalSalary: '4,500,500',
  },
  {
    id: 8,
    date: '2025년 06월',
    totalTime: '168',
    basicSalary: '2,920,000',
    overSalary: '1,200,100',
    totalSalary: '4,120,100',
  },
  {
    id: 9,
    date: '2025년 07월',
    totalTime: '160',
    basicSalary: '2,700,500',
    overSalary: '1,100,800',
    totalSalary: '3,801,300',
  },
  {
    id: 10,
    date: '2025년 08월',
    totalTime: '176',
    basicSalary: '2,800,100',
    overSalary: '1,300,600',
    totalSalary: '4,100,700',
  },
];

const SalaryDetailsMain = () => {
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
    <S.MainContainer>
      <S.Title>
        <div className="title-item">근무 년월</div>
        <div className="title-item">총 근무 시간(야간, 주말 포함)</div>
        <div className="title-item">기본급</div>
        <div className="title-item">초과 근무 수당</div>
        <div className="title-item">총 금액</div>
      </S.Title>

      {currentPageItems.map((item) => (
        <S.Content key={item.id}>
          <div className="data-item">{item.date}</div>
          <div className="data-item">{item.totalTime}시간</div>
          <div className="data-item">{item.basicSalary}원</div>
          <div className="data-item">{item.overSalary}원</div>
          <div className="data-item">{item.totalSalary}원</div>
        </S.Content>
      ))}

      <S.PaginationContainer>
        <PagiNation maxPage={2} />
      </S.PaginationContainer>
    </S.MainContainer>
  );
};

const S = {
  MainContainer: styled.div`
    width: 70vw;
    height: 70vh;
    margin-left: 7vw;
    border: 1px solid ${colors.semantic.text.gray};
    display: flex;
    flex-direction: column;
  `,

  Title: styled.div`
    width: 100%;
    min-height: 9%;
    background-color: ${colors.semantic.background.light};
    display: flex;
    margin-bottom: 2vh;

    .title-item {
      color: ${colors.semantic.text.dark};
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 700;
    }
  `,

  Content: styled.div`
    width: 100%;
    min-height: 7.8%;
    display: flex;

    .data-item {
      color: ${colors.semantic.text.dark};
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &:hover {
      background-color: ${colors.semantic.hover.primary};
    }
    &:active {
      background-color: ${colors.semantic.primary};
    }
  `,

  PaginationContainer: styled.div`
    margin-top: auto;
    padding: 1rem;
  `,
};

export default SalaryDetailsMain;
