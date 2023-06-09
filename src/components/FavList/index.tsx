import { Button, Link, CardActions, Card, CardContent, ListItem, List, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useBeerListDispatch, useBeerListState } from 'components/BeerList/BeerListContext';
import { useCallback } from 'react';


export default function FavList() {
  const state = useBeerListState();
  const dispatch = useBeerListDispatch();

  const clearFavs = useCallback(
    () => dispatch?.({ type: 'setFavs', payload: [] }),
    [dispatch]
  );

  if (!state) {
    return null;
  }

  const favElements = state.elementsToDisplayFavs.filter(f => f.isFavourite);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">
          Favourite items
        </Typography>
        <List>
          {favElements.filter(f => f.isFavourite).map((beer, index) => (
            <ListItem key={index.toString()} disableGutters>
              <Link component={RouterLink} to={`/beer/${beer.id}`}>
                {beer.name}
              </Link>
            </ListItem>
          ))}
        </List>
        {!favElements.length && (
          <Typography color="text.secondary">
            No favourite items
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button
          variant='contained'
          size='small'
          onClick={clearFavs}
        >
          Clear all items
        </Button>
      </CardActions>
    </Card>
  );
}