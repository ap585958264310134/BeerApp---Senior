import { Avatar, ListItemAvatar, ListItemButton, ListItemText, Stack } from '@mui/material';
import SportsBar from '@mui/icons-material/SportsBar';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

interface BeerListElementProps {
  id: string;
  isFavourite?: boolean;
  name: string;
  breweryType: string;
  onClick: (id: string) => void;
  onElementFavClick: (id: string) => void;
}

function Fav(props: { 
  id: string,
  isFavourite: boolean,
  onElementFavClick: (id: string) => void;
}) {
  const icon = props.isFavourite ? <StarIcon /> : <StarBorderIcon />;
  
  return (
    <div
      onClick={(ev) => {
        ev.stopPropagation();
        props.onElementFavClick(props.id);
      }}
    >
      {icon}
    </div>
  );
}

export default function BeerListElement(props: BeerListElementProps) {
  return (
    <ListItemButton key={props.id} onClick={props.onClick.bind(null, props.id)}>
      <Stack spacing={2} direction="row" alignItems="center">
        <Fav
          id={props.id}
          isFavourite={!!props.isFavourite}
          onElementFavClick={props.onElementFavClick}
        />
        <ListItemAvatar>
          <Avatar>
            <SportsBar />
          </Avatar>
        </ListItemAvatar>
      </Stack>
      <ListItemText primary={props.name} secondary={props.breweryType} />
    </ListItemButton>
  );
}
