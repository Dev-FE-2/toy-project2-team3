import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles';
import usePagination, { PagiNationProps } from '../hooks/usePagination';

const Pagination: React.FC<PagiNationProps> = ({
  totalPage,
  limit,
  page,
  setPage,
}) => {
  const { currentPageArray } = usePagination({
    totalPage,
    limit,
    page,
    setPage,
  });

  const updateURL = (newPage: number) => {
    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.set('page', newPage.toString());
    window.history.pushState(
      {},
      '',
      `${window.location.pathname}?${newSearchParams}`
    );
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setPage(newPage);
      updateURL(newPage);
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
      isActive ? colors.semantic.primary : colors.semantic.background.light};
    color: ${({ isActive }) => (isActive ? colors.semantic.text.light : '')};
    border-radius: 8px;
    padding: 0.26vw 0.625vw;
    cursor: pointer;
    margin-right: 0.78vw;
    &:hover {
      background-color: ${({ isActive }) =>
        isActive
          ? colors.semantic.hover.primary
          : colors.semantic.hover.secondary};
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
