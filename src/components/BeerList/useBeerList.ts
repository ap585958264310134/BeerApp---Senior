import { useReducer, useEffect } from 'react';
import type { BeerListProps } from '.';
import type { Beer, TYPE } from 'types';
import {
  getNoOfPages,
  filterElements,
  sortElements,
  getElementsToRender,
  applyFavs
} from './useBeerListUtils';

export enum SORT_DIRECTION {
  ASC = 'asc',
  DESC = 'desc',
  DEFAULT = 'default'
}

export type ACTIONTYPE =
  | { type: 'setCurrentPage', payload: number }
  | { type: 'setNameFilter', payload: string }
  | { type: 'setNameSorting', payload: SORT_DIRECTION }
  | { type: 'setBreweryTypeFilter', payload: Array<TYPE> }
  | { type: 'setFavs', payload: Array<string> };

interface UseBeerListProps extends Pick<BeerListProps, 'beers' | 'elementsPerPage'> {
  skipFilters?: boolean;
}

export interface ExtendedBeer extends Beer {
  isFavourite: boolean;
}

export interface UseBeerListState {
  noOfPages: number;
  elementsToDisplay: ExtendedBeer[];
  elementsToDisplayFavs: ExtendedBeer[];
  currentPage: number;
  nameFilter: string;
  nameSorting: SORT_DIRECTION;
  breweryTypeFilter: Array<TYPE>;
  favs: Array<string>;
}

interface InitialState {
  currentPage: number;
  nameFilter: string;
  nameSorting: SORT_DIRECTION;
  breweryTypeFilter: Array<TYPE>;
  favs: Array<string>;
}

const initialState: InitialState = {
  currentPage: 1,
  nameFilter: '',
  nameSorting: SORT_DIRECTION.DEFAULT,
  breweryTypeFilter: [],
  favs: []
};

function reducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case 'setCurrentPage':
      return {
        ...state,
        currentPage: action.payload
      };
    case 'setNameFilter':
      return {
        ...state,
        nameFilter: action.payload
      };
    case 'setNameSorting':
      return {
        ...state,
        nameSorting: action.payload
      };
    case 'setBreweryTypeFilter':
      return {
        ...state,
        breweryTypeFilter: action.payload
      }
    case 'setFavs':
      return {
        ...state,
        favs: action.payload
      }
    default:
      return state;
  }
}

const LOCAL_STORAGE_KEY = 'USE_BEER_LIST';

export function useBeerList({
  beers,
  elementsPerPage
}: UseBeerListProps) {
  const [{
    currentPage,
    nameFilter,
    nameSorting,
    breweryTypeFilter,
    favs
  }, dispatch] = useReducer(reducer, initialState, () => {
    const value = localStorage.getItem(LOCAL_STORAGE_KEY);
    return value ? JSON.parse(value) : initialState;
  });

  const filteredBeers = filterElements({
    beers,
    nameFilter,
    breweryTypeFilter
  });

  const sortedBeers = sortElements({
    beers: filteredBeers,
    nameSorting
  });

  const noOfPages = getNoOfPages({
    beers: sortedBeers,
    elementsPerPage
  });

  const elementsToDisplayWithoutFav = getElementsToRender({
    beers: filteredBeers,
    elementsPerPage,
    currentPage,
    setCurrentPage: (page: number) => dispatch({ type: 'setCurrentPage', payload: page })
  });

  const elementsToDisplay = applyFavs({
    beers: elementsToDisplayWithoutFav,
    favs
  });

  const elementsToDisplayFavs = applyFavs({
    beers,
    favs
  });

  const state: UseBeerListState = {
    noOfPages,
    elementsToDisplay,
    elementsToDisplayFavs,
    currentPage,
    nameFilter,
    nameSorting,
    breweryTypeFilter,
    favs
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentPage,
    nameFilter,
    nameSorting,
    breweryTypeFilter,
    favs, 
    dispatch
  ]);

  return {
    state,
    dispatch
  }
}