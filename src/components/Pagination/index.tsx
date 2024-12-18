import React, { useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../../styles';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../state/store';
import type { RootState } from '../../state/store';
import { setCurrentPage } from '../../slices/pagination/action';
import { VISIBLE_PAGE_COUNT } from '../../constant';
type PagiNationProps = {
  maxPage: number;
};

const Pagination: React.FC<PagiNationProps> = ({ maxPage }) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage
  );

  const currentPageBase =
    Math.floor((currentPage - 1) / VISIBLE_PAGE_COUNT) * VISIBLE_PAGE_COUNT + 1;

  const pageList = useMemo(() => {
    const pages = [];
    for (let i = 0; i < VISIBLE_PAGE_COUNT; i++) {
      const page = currentPageBase + i;
      if (page <= maxPage) pages.push(page);
    }
    return pages;
  }, [currentPageBase, maxPage, VISIBLE_PAGE_COUNT]);

  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage)); // currentPage 상태 업데이트
    sessionStorage.setItem('currentPage', newPage.toString()); // sessionStorage에 페이지 저장
    const currentPath = window.location.pathname; // 현재 페이지 URL 경로 가져오기
    window.history.pushState({ page: newPage }, `Page ${newPage}`, currentPath);
  };

  useEffect(() => {
    // 페이지가 처음 로드될 때 sessionStorage에서 currentPage 상태를 확인
    const savedPage = sessionStorage.getItem('currentPage');
    const initialPage = savedPage ? Number(savedPage) : 1; // sessionStorage 값이 있으면 사용, 없으면 기본값 1

    dispatch(setCurrentPage(initialPage)); // 초기 페이지 설정
  }, [dispatch]);

  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.page) {
        dispatch(setCurrentPage(event.state.page)); // 이전 페이지로 이동
      } else {
        dispatch(setCurrentPage(1)); // 상태가 없으면 기본 페이지로 이동
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [dispatch]);

  return (
    <S.PaginationContainer>
      <S.MoveButton
        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </S.MoveButton>
      {pageList.map((page) => (
        <S.PageButton
          key={page}
          onClick={() => handlePageChange(page)}
          isActive={page === currentPage}
        >
          {page}
        </S.PageButton>
      ))}
      <S.MoveButton
        onClick={() => handlePageChange(Math.min(currentPage + 1, maxPage))}
        disabled={currentPage === maxPage}
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
