import { Avatar, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import SportsBar from '@mui/icons-material/SportsBar';

interface BeerListElementProps {
  id: string;
  isFavourite?: boolean;
  name: string;
  breweryType: string;
  onClick: (id: string) => void;
}

export default function BeerListElement(props: BeerListElementProps) {
  return (
    <ListItemButton key={props.id} onClick={props.onClick.bind(null, props.id)}>
      <ListItemAvatar>
        <Avatar>
          <SportsBar />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={props.name} secondary={props.breweryType} />
    </ListItemButton>
  );
}
