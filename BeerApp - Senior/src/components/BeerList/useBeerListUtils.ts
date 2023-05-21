import { Beer, TYPE } from "types";
import { SORT_DIRECTION } from "./useBeerList";
import { BeerListProps } from ".";

export function getNoOfPages({
  beers,
  elementsPerPage
}: Pick<BeerListProps, 'beers' | 'elementsPerPage'>): number {
  if (!elementsPerPage) {
    return 0;
  }

  return Math.ceil(beers.length / elementsPerPage);
}

export function filterElements({
  beers,
  nameFilter,
  breweryTypeFilter
}: {
  beers: Beer[];
  nameFilter: string;
  breweryTypeFilter: Array<TYPE>;
}) {
  let filtered = beers;

  if (nameFilter !== '') {
    filtered = beers.filter(beer => beer.name.toLowerCase().includes(nameFilter.toLowerCase()));
  }

  if (breweryTypeFilter.length) {
    filtered = filtered.filter(beer => breweryTypeFilter.includes(beer.brewery_type));
  }

  return filtered;
}

export function sortElements({
  beers,
  nameSorting
}: {
  beers: Beer[],
  nameSorting: SORT_DIRECTION
}) {
  let sorted = beers;

  if (nameSorting !== SORT_DIRECTION.DEFAULT) {
    sorted = beers.sort((a, b) => {
      if (a.name > b.name) {
        return nameSorting === SORT_DIRECTION.ASC ? 1 : -1;
      }

      if (a.name < b.name) {
        return nameSorting === SORT_DIRECTION.ASC ? -1 : 1;
      }

      return 0;
    });
  }

  return sorted;
}

export function getElementsToRender({
  beers,
  currentPage,
  setCurrentPage,
  elementsPerPage
}: Pick<BeerListProps, 'beers' | 'elementsPerPage'> & {
  currentPage: number
  setCurrentPage: (newCurrentPage: number) => void;
}) {
  const start = (currentPage - 1) * elementsPerPage;

  const beersToDisplay = beers.slice(
    start,
    start + elementsPerPage
  );

  if (!beersToDisplay.length && currentPage !== 1) {
    setCurrentPage(1);
  }

  return beersToDisplay;
}