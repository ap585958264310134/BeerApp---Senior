import CommonBox from 'components/CommonBox';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { SORT_DIRECTION } from './useBeerList';
import { TYPE } from  'types';
import MenuItem from '@mui/material/MenuItem';
import { useBeerListState, useBeerListDispatch } from './BeerListContext';
import { useCallback } from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import styles from './BeerListFilters.module.css';

export enum TYPE_ENUM {
  micro = 'Micro',
  nano = 'Nano',
  regional = 'Regional',
  brewpub = 'Brewpub',
  large = 'Large',
  planning = 'Planning',
  bar = 'Bar',
  contract = 'Contract',
  proprietor = 'Proprietor',
  closed = 'Closed'
};

export default function BeerListFilters() {
  const state = useBeerListState();
  const dispatch = useBeerListDispatch();

  const setNameFilter = useCallback(
    (newNameFilter: string) => dispatch?.({ type: 'setNameFilter', payload: newNameFilter }),
    [dispatch]
  );
  const setNameSorting = useCallback(
    (newNameSorting: SORT_DIRECTION) => dispatch?.({ type: 'setNameSorting', payload: newNameSorting }),
    [dispatch]
  );
  const setBreweryTypeFilter = useCallback(
    (newBreweryTypeFilter: TYPE[]) => dispatch?.({ type: 'setBreweryTypeFilter', payload: newBreweryTypeFilter }),
    [dispatch]
  );

  if (!state) { return null };

  return (
      <CommonBox>
      <Stack direction="row" spacing={2} className={styles.FiltersStack}>
        <TextField
          placeholder="Search..."
          value={state.nameFilter}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setNameFilter(event.target.value);
          }}
        />
        <Select
          value={state.nameSorting}
          onChange={(event: SelectChangeEvent<SORT_DIRECTION>) => {
            setNameSorting(event.target.value as SORT_DIRECTION);
          }}
        >
          <MenuItem value={SORT_DIRECTION.DEFAULT}>Default</MenuItem>
          <MenuItem value={SORT_DIRECTION.ASC}>Name ↑</MenuItem>
          <MenuItem value={SORT_DIRECTION.DESC}>Name ↓</MenuItem>
        </Select>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel 
            id="filter-type-input-label"
            className={styles.FilterTypeInputLabel}
          >Type</InputLabel>
          <Select
            multiple
            labelId="filter-type-input-label"
            value={state.breweryTypeFilter}
            onChange={(event: SelectChangeEvent<TYPE[]>) => {
              setBreweryTypeFilter(event.target.value as TYPE[]);
            }}  
          >
            {Object.keys(TYPE_ENUM).map((type) => {
              const value = TYPE_ENUM[type as keyof typeof TYPE_ENUM];

              return (
                <MenuItem key={type} value={type}>
                  {value}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
    </Stack>
      </CommonBox>
  )
}