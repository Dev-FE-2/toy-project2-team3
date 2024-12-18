import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../styles';

type PagiNationProps = {
  totalPage: number;
  limit: number;
  page: number;
  setPage: (page: number) => void;
};

const sliceArrayByLimit = (totalPage: number, limit: number) => {
  const pages = [];
  for (let i = 1; i <= totalPage; i++) {
    pages.push(i);
  }
  const result = [];
  for (let i = 0; i < pages.length; i += limit) {
    result.push(pages.slice(i, i + limit));
  }
  return result;
};

const Pagination: React.FC<PagiNationProps> = ({
  totalPage,
  limit,
  page,
  setPage,
}) => {
  const [currentPageArray, setCurrentPageArray] = useState<number[]>([]);
  const [totalPageArray, setTotalPageArray] = useState<number[][]>([]);

  // 컴포넌트 마운트 시 URL에서 페이지 번호를 가져와 상태 초기화
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const pageParam = parseInt(searchParams.get('page') || '1', 10);
    if (pageParam >= 1 && pageParam <= totalPage) {
      setPage(pageParam);
    } else {
      setPage(1); // 유효하지 않은 경우 기본값 설정
    }
  }, [totalPage, setPage]);

  useEffect(() => {
    const slicedPageArray = sliceArrayByLimit(totalPage, limit);
    setTotalPageArray(slicedPageArray);
    setCurrentPageArray(slicedPageArray[0] || []);
  }, [totalPage, limit]);

  useEffect(() => {
    if (totalPageArray.length > 0) {
      if (page % limit === 1) {
        setCurrentPageArray(totalPageArray[Math.floor(page / limit)]);
      } else if (page % limit === 0) {
        setCurrentPageArray(totalPageArray[Math.floor(page / limit) - 1]);
      }
    }
  }, [page, totalPageArray, limit]);

  // 페이지 변경 시 URL 업데이트
  useEffect(() => {
    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.set('page', page.toString());
    window.history.pushState(
      {},
      '',
      `${window.location.pathname}?${newSearchParams}`
    );
  }, [page]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setPage(newPage);
    }
  };

  return (
    <S.PaginationContainer>
      <S.MoveButton
        onClick={() => handlePageChange(Math.max(page - 1, 1))}
        disabled={page === 1}
      >
        Previous
      </S.MoveButton>
      {currentPageArray.map((pageNumber) => (
        <S.PageButton
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          isActive={pageNumber === page}
        >
          {pageNumber}
        </S.PageButton>
      ))}
      <S.MoveButton
        onClick={() => handlePageChange(Math.min(page + 1, totalPage))}
        disabled={page === totalPage}
      >
        Next
      </S.MoveButton>
    </S.PaginationContainer>
  );
};

const S = {
  PaginationContainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  PageButton: styled.button<{ isActive: boolean }>`
    background-color: ${({ isActive }) =>
      isActive
        ? `${colors.semantic.primary}`
        : `${colors.semantic.background.light}`};
    color: ${({ isActive }) =>
      isActive ? `${colors.semantic.text.light}` : ''};
    border-radius: 8px;
    padding: 0.26vw 0.625vw;
    cursor: pointer;
    margin-right: 0.78vw;
    &:hover {
      background-color: ${({ isActive }) =>
        isActive
          ? `${colors.semantic.hover.primary}`
          : `${colors.semantic.hover.secondary}`};
    }
    &:disabled {
      background-color: ${colors.semantic.disabled};
    }
  `,
  MoveButton: styled.button`
    margin-right: 0.78vw;
    cursor: pointer;
    color: ${colors.semantic.text.gray};
  `,
};

export default Pagination;
