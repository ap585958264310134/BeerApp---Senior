import Stack from '@mui/material/Stack';
import { Beer } from 'types';
import BeerListFilters from './BeerListFilters';

import BeerListContent from './BeerListContent';
import BeerListPagination from './BeerListPagination';

export interface BeerListProps {
  beers: Array<Beer>;
  onElementClick?: (id: string) => void;
  elementsPerPage: number;
}

export default function BeerList(props: BeerListProps) {
  return (
    <Stack spacing={2}>
        <BeerListFilters />
        <BeerListContent 
          onElementClick={props.onElementClick || (() => {})}
        />
        <BeerListPagination />
    </Stack>
  )
}