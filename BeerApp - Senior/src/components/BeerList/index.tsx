import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import { Beer } from 'types';
import BeerListFilters from './BeerListFilters';
import CommonBox from 'components/CommonBox';
import { SORT_DIRECTION, useBeerList } from './useBeerList';
import { useCallback, useContext } from 'react';
import { BeerListProvider } from './BeerListContext';
import BeerListContent from './BeerListContent';
import BeerListPagination from './BeerListPagination';

export interface BeerListProps {
  beers: Array<Beer>;
  onElementClick: (id: string) => void;
  elementsPerPage: number;
}

export default function BeerList(props: BeerListProps) {
  return (
    <Stack spacing={2}>
      <BeerListProvider props={props}>
        <BeerListFilters />
        <BeerListContent 
          onElementClick={props.onElementClick}
        />
        <BeerListPagination />
      </BeerListProvider>
    </Stack>
  )
}