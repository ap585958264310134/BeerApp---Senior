import { createContext, useContext } from 'react';
import { ACTIONTYPE, UseBeerListState, useBeerList } from './useBeerList';
import { BeerListProps } from '.';

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
  children,
  props
}: { 
  children: React.ReactNode,
  props: BeerListProps
}) {
  const {
    state,
    dispatch
  } = useBeerList(props);

  return (
    <BeerListContext.Provider value={state}>
      <BeerListDispatchContext.Provider value={dispatch}>
        {children}
      </BeerListDispatchContext.Provider>
    </BeerListContext.Provider>
  );
}
