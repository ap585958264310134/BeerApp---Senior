import CommonBox from 'components/CommonBox';
import List from '@mui/material/List';
import BeerListElement from './BeerListElement';
import { useBeerListState } from './BeerListContext';

interface BeerListContentProps {
  onElementClick: (id: string) => void;
}

export default function BeerListContent(props: BeerListContentProps) {
  const state = useBeerListState();

  if (!state) {
    return null;
  }

  return (
    <CommonBox>
      <List>
        {state.elementsToDisplay.map((beerProps) => BeerListElement({
          id: beerProps.id,
          name: beerProps.name,
          breweryType: beerProps.brewery_type,
          onClick: props.onElementClick
        }))}
      </List>
    </CommonBox>
  );
}