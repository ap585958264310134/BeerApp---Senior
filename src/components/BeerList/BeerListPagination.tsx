import React, { useCallback } from 'react';
import CommonBox from 'components/CommonBox';
import Pagination from '@mui/material/Pagination';
import { useBeerListState, useBeerListDispatch } from './BeerListContext';

export default function BeerListPagination() {
  const state = useBeerListState();
  const dispatch = useBeerListDispatch();

  const setCurrentPage = useCallback(
    (newCurrentPage: number) => dispatch?.({ type: 'setCurrentPage', payload: newCurrentPage }),
    [dispatch]
  );

  if (!state) {
    return null;
  }

  const {
    currentPage,
    noOfPages
  } = state;

  return (
    <CommonBox>
      <Pagination
        count={noOfPages || 1}
        disabled={!noOfPages}
        page={currentPage}
        onChange={(event, page) => {
          setCurrentPage(page);
        }}
      />
    </CommonBox>
  );
}