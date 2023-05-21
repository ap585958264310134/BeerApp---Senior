import { createContext, useContext } from 'react';
import { ACTIONTYPE, UseBeerListState, useBeerList } from './useBeerList';
import { useBeerData } from 'hooks/useBeerData';

const BeerListContext = createContext<UseBeerListState | null>(null);

const BeerListDispatchContext = 
  createContext<((action: ACTIONTYPE) => void) | null>(null);

export function useBeerListState() {
  return useContext(BeerListContext);
}

export function useBeerListDispatch() {
  return useContext(BeerListDispatchContext);
}

export function BeerListProvider({ 
  children
}: { 
  children: React.ReactNode
}) {
  const {
    beerData
  } = useBeerData();

  const {
    state,
    dispatch
  } = useBeerList({
    beers: beerData || [],
    elementsPerPage: 5
  });

  return (
    <BeerListContext.Provider value={state}>
      <BeerListDispatchContext.Provider value={dispatch}>
        {children}
      </BeerListDispatchContext.Provider>
    </BeerListContext.Provider>
  );
}
