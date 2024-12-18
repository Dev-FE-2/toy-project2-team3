import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import type { RootState } from '../../../../../state/store';
import { colors } from '../../../../../styles';
import { Pagination, Loading } from '../../../../../components';
import AddPayStub from './AddPayStub';
import type { SalaryRequest } from '../../../../../types/interface';
import { fetchDataFromDB } from '../../../../../firebase';
import { ITEM_PER_PAGE } from '../../../../../constant';
import { useLocation } from 'react-router-dom';
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const SalaryCorrectionList = () => {
  const [items, setItems] = useState<SalaryRequest[]>([]);
  const [currentPageItems, setCurrentPageItems] = useState<SalaryRequest[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SalaryRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageParam = queryParams.get('page');
  const initialPage = pageParam ? parseInt(pageParam, 10) : 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const { userInfo } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchSalaryRequestData = async () => {
      try {
        const data = await fetchDataFromDB<SalaryRequest>({
          table: 'SalaryRequest',
          key: userInfo.userId as string,
        });

        if (data) {
          const sortedData = Object.values(data).sort((a, b) => {
            return (
              new Date(b.requestedAt).getTime() -
              new Date(a.requestedAt).getTime()
            );
          });
          setItems(sortedData);
        } else {
          setItems([]);
        }
      } catch (err) {
        console.error(err);
        setItems([]);
      } finally {
        setIsLoading(false); // 데이터를 가져온 후에 isLoading을 false로 설정
      }
    };

    if (userInfo) {
      fetchSalaryRequestData();
    }
  }, [userInfo]);

  // 현재 페이지의 항목 계산
  useEffect(() => {
    const indexOfLastItem = currentPage * ITEM_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEM_PER_PAGE;
    const currentItemsSlice = items.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentPageItems(currentItemsSlice);
  }, [currentPage, items]); // items가 변경될 때도 currentPageItems를 업데이트

  const handleItemClick = (item: SalaryRequest) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const totalPage = Math.ceil(items.length / ITEM_PER_PAGE);

  if (isLoading) return <Loading />;

  return (
    <S.SalaryContainer>
      <S.SalaryLabelContainer>
        <div className="item-ceil">
          <p>신청 날짜</p>
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
        {currentPageItems.length > 0 ? (
          currentPageItems.map((item) => (
            <div
              className="salary__item-container"
              key={item.salaryId}
              onClick={() => handleItemClick(item)}
            >
              <div className="item-ceil">
                <span>{formatDate(item.requestedAt)}</span>
              </div>
              <div className="item-ceil">
                <span>{item.requestedTitle}</span>
              </div>
              <div className="item-ceil align-center">
                {item.handleStatus === '승인' ? (
                  <div className="status approve">승인</div>
                ) : item.handleStatus === '거부' ? (
                  <div className="status reject">거부</div>
                ) : (
                  <div className="status processing">처리 전</div>
                )}
              </div>
              <div className="item-ceil align-center">
                <span>{item.rejectReason}</span>
              </div>
            </div>
          ))
        ) : (
          <div>데이터가 존재하지 않습니다.</div>
        )}
      </S.SalaryMainContainer>

      <S.PaginationContainer>
        <Pagination
          totalPage={totalPage}
          limit={ITEM_PER_PAGE}
          page={currentPage}
          setPage={setCurrentPage}
        />
      </S.PaginationContainer>
      {isModalOpen && selectedItem && (
        <AddPayStub item={selectedItem} onClose={closeModal} />
      )}
    </S.SalaryContainer>
  );
};

const S = {
  SalaryContainer: styled.div`
    width: 100%;
    height: 70vh;
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
