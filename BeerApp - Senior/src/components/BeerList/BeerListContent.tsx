import CommonBox from 'components/CommonBox';
import List from '@mui/material/List';
import BeerListElement from './BeerListElement';
import { useBeerListState, useBeerListDispatch } from './BeerListContext';
import { useCallback } from 'react';

interface BeerListContentProps {
  onElementClick: (id: string) => void;
}

export default function BeerListContent(props: BeerListContentProps) {
  const state = useBeerListState();
  const dispatch = useBeerListDispatch();

  const onElementFavClick = useCallback((id: string) => {
    if (!state || !dispatch) {
      return;
    }

    const newFavs = state?.favs.includes(id)
      ? state.favs.filter((fav) => fav !== id)
      : [...state?.favs, id];

    dispatch({
      type: 'setFavs',
      payload: newFavs
    });
  }, [state, dispatch]);

  if (!state || !dispatch) {
    return null;
  }

  return (
    <CommonBox>
      <List>
        {state.elementsToDisplay.map((beerProps) => BeerListElement({
          id: beerProps.id,
          name: beerProps.name,
          breweryType: beerProps.brewery_type,
          isFavourite: state.favs.includes(beerProps.id),
          onClick: props.onElementClick,
          onElementFavClick
        }))}
      </List>
    </CommonBox>
  );
}