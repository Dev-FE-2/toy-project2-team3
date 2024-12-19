import { useEffect, useState } from 'react';

export type PagiNationProps = {
  totalPage: number;
  limit: number;
  page: number;
  setPage: (page: number) => void;
};

const sliceArrayByLimit = (totalPage: number, limit: number) => {
  const result = [];
  const pages = [];

  for (let i = 1; i <= totalPage; i++) {
    pages.push(i);
    // 페이지가 limit에 도달했거나 마지막 페이지일 때 그룹화
    if (i === limit || i === totalPage) {
      result.push(pages.slice());
      pages.length = 0;
    }
  }

  return result;
};

const usePagination = ({
  totalPage,
  limit,
  page,
  setPage,
}: PagiNationProps) => {
  const [currentPageArray, setCurrentPageArray] = useState<number[]>([]);
  const [totalPageArray, setTotalPageArray] = useState<number[][]>([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const pageParam = parseInt(searchParams.get('page') || '1', 10);
    if (pageParam >= 1 && pageParam <= totalPage) {
      setPage(pageParam);
    } else {
      setPage(1);
    }
  }, [totalPage, setPage]);

  useEffect(() => {
    const slicedPageArray = sliceArrayByLimit(totalPage, limit);
    setTotalPageArray(slicedPageArray);
    setCurrentPageArray(slicedPageArray[0] || []);
  }, [totalPage, limit]);

  return {
    currentPageArray,
    totalPageArray,
    page,
    setCurrentPageArray,
  };
};

export default usePagination;
