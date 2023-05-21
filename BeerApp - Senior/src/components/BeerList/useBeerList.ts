import { useReducer } from 'react';
import type { BeerListProps } from '.';
import type { Beer, TYPE } from 'types';
import {
  getNoOfPages,
  filterElements,
  sortElements,
  getElementsToRender
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
  | { type: 'setBreweryTypeFilter', payload: Array<TYPE> };

interface UseBeerListProps extends Pick<BeerListProps, 'beers' | 'elementsPerPage'> {}

export interface UseBeerListState {
  noOfPages: number;
  elementsToDisplay: Beer[];
  currentPage: number;
  nameFilter: string;
  nameSorting: SORT_DIRECTION;
  breweryTypeFilter: Array<TYPE>;
}

interface InitialState {
  currentPage: number;
  nameFilter: string;
  nameSorting: SORT_DIRECTION;
  breweryTypeFilter: Array<TYPE>;
}

const initialState: InitialState = {
  currentPage: 1,
  nameFilter: '',
  nameSorting: SORT_DIRECTION.DEFAULT,
  breweryTypeFilter: []
};

function reducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case 'setCurrentPage':
      return {
        ...state,
        currentPage: action.payload
      };
    case 'setNameFilter':
      console.log('setNameFilter', action.payload)
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
    default:
      return state;
  }
}

export function useBeerList({
  beers,
  elementsPerPage
}: UseBeerListProps) {
  const [{
    currentPage,
    nameFilter,
    nameSorting,
    breweryTypeFilter
  }, dispatch] = useReducer(reducer, initialState);

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

  const elementsToDisplay = getElementsToRender({
    beers: filteredBeers,
    elementsPerPage,
    currentPage,
    setCurrentPage: (page: number) => dispatch({ type: 'setCurrentPage', payload: page })
  });

  const state: UseBeerListState = {
    noOfPages,
    elementsToDisplay,
    currentPage,
    nameFilter,
    nameSorting,
    breweryTypeFilter
  };

  return {
    state,
    dispatch
  }
}