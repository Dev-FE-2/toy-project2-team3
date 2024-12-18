import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchDataFromDB } from '../../../../firebase';
import type { RootState } from '../../../../state/store';
import { colors } from '../../../../styles';
import NormalPayStub from './NormalPayStub';
import { Loading, Pagination } from '../../../../components';
import { ITEM_PER_PAGE } from '../../../../constant';
import { useLocation } from 'react-router-dom';

export type Item = {
  id: string;
  baseSalary: number;
  baseWorkingHours: number;
  createdAt: string;
  monthlySalary: number;
  monthlyWorkingHours: number;
  nightPay: number;
  nightWorkingHours: number;
  overtime: number;
  overtimeHours: number;
};

const SalaryDetailsMain = () => {
  const [salaryListData, setSalaryListData] = useState<Item[]>([]);
  const [currentPageItems, setCurrentPageItems] = useState<Item[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageParam = queryParams.get('page');
  const initialPage = pageParam ? parseInt(pageParam, ITEM_PER_PAGE) : 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const { userInfo } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchSalaryListData = async () => {
      if (!userInfo?.userId) return;
      try {
        const data = await fetchDataFromDB<{ Salary: Item[] }>({
          table: 'Salary',
          key: userInfo.userId,
        });
        if (data && Array.isArray(data)) {
          // 최신순으로 정렬
          const sortedData = data.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setSalaryListData(sortedData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSalaryListData();
  }, [userInfo]);

  // 항목 필터링
  useEffect(() => {
    const indexOfLastItem = currentPage * ITEM_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEM_PER_PAGE;
    const indexOfLastItem = currentPage * ITEM_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEM_PER_PAGE;
    const currentItemsSlice = salaryListData.slice(
      indexOfFirstItem,
      indexOfLastItem
    );
    setCurrentPageItems(currentItemsSlice);
  }, [currentPage, salaryListData]);

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const totalPage = Math.ceil(salaryListData.length / ITEM_PER_PAGE);

  if (isLoading) return <Loading />;

  return (
    <S.MainContainer>
      <S.Title>
        <div className="title-item">근무 년월</div>
        <div className="title-item">기본급</div>
        <div className="title-item">총 근무 시간</div>
        <div className="title-item">야간 수당</div>
        <div className="title-item">초과 근무 수당</div>
      </S.Title>

      {currentPageItems.length > 0 ? (
        currentPageItems.map((item) => (
          <S.Content key={item.id} onClick={() => handleItemClick(item)}>
            <div className="data-item">{item.id}</div>
            <div className="data-item">
              {item.baseSalary.toLocaleString()}원
            </div>
            <div className="data-item">{item.monthlyWorkingHours}시간</div>
            <div className="data-item">{item.nightPay.toLocaleString()}원</div>
            <div className="data-item">{item.overtime.toLocaleString()}원</div>
          </S.Content>
        ))
      ) : (
        <div>데이터가 존재하지 않습니다.</div>
      )}
      {isModalOpen && (
        <NormalPayStub item={selectedItem} onClose={closeModal} />
      )}

      <S.PaginationContainer>
        <Pagination
          totalPage={totalPage}
          limit={ITEM_PER_PAGE}
          page={currentPage}
          setPage={setCurrentPage}
        />
      </S.PaginationContainer>
    </S.MainContainer>
  );
};

const S = {
  MainContainer: styled.div`
    width: 100%;
    height: 70vh;
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
    min-height: 7.5%;
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
