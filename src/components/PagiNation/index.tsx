import React, { useMemo } from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/';
type PagiNationProps = {
  maxPage: number; // 최대 페이지 수
  visiblePageCount: number; // 한 번에 보여줄 페이지 수
  currentPage: number; // 현재 페이지
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>; // 페이지 변경 함수
  // 우선 단순히 currentPage의 상태를 업데이트하는 함수라고 이해했습니다
};

const PagiNation: React.FC<PagiNationProps> = ({
  maxPage,
  visiblePageCount,
  currentPage,
  setCurrentPage,
}) => {
  // 현재 페이지 그룹의 시작 페이지 계산
  const currentPageBase =
    Math.floor((currentPage - 1) / visiblePageCount) * visiblePageCount + 1;

  // 페이지 목록 생성
  const pageList = useMemo(() => {
    const pages = [];
    for (let i = 0; i < visiblePageCount; i++) {
      const page = currentPageBase + i;
      if (page <= maxPage) pages.push(page); // maxPage를 넘지 않도록
    }
    return [...pages]; //순수함을 지키기 위해 새로운 배열을 생성
  }, [currentPage, maxPage, visiblePageCount, currentPageBase]);

  return (
    <StyledPaginationContainer>
      <StyledMoveButton
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} // 1페이지 이하로 내려가지 않도록
        disabled={currentPage === 1}
      >
        Previous
      </StyledMoveButton>
      {pageList.map((page) => (
        <StyledPageButton
          key={page}
          onClick={() => setCurrentPage(page)}
          isActive={page === currentPage}
        >
          {page}
        </StyledPageButton>
      ))}
      <StyledMoveButton
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, maxPage))} // maxPage 이상으로 올라가지 않도록
        disabled={currentPage === maxPage}
      >
        Next
      </StyledMoveButton>
    </StyledPaginationContainer>
  );
};

const StyledPaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledPageButton = styled.button<{ isActive: boolean }>`
  background-color: ${({ isActive }) =>
    isActive
      ? `${colors.semantic.primary}`
      : `${colors.semantic.background.light}`};
  color: ${({ isActive }) => (isActive ? `${colors.semantic.text.light}` : '')};
  border-radius: 8px;
  padding: 0.26vw 0.625vw;
  cursor: pointer;
  margin-right: 0.78vw;
  &:hover {
    background-color: ${({ isActive }) =>
      isActive
        ? `${colors.semantic.hover.primary}`
        : `${colors.semantic.hover.tertiary}`};
  }
  &:disabled {
    background-color: ${colors.semantic.disabled};
  }
`;

const StyledMoveButton = styled.button`
  margin-right: 0.78vw;
  cursor: pointer;
  color: ${colors.semantic.text.gray};
`;

export default PagiNation;
