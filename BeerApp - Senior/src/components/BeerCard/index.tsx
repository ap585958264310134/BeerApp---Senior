import { Beer } from '../../types';
import styles from './BeerCard.module.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MapPreview from '../MapPreview';

export type BeerCardProps = Pick<
  Beer, 
  'id' | 'name' | 'brewery_type' | 'website_url' | 'phone' | 'address_1' |
  'address_2' | 'address_3' | 'city' | 'state' | 'country' | 'longitude' | 'latitude'
>;

function convertCoord(coord: string): number | null {
  return coord ? Number(coord) : null;
}

function Address({lines}: {lines: (string | undefined)[]}) {
  return (
    <div className={styles.addressContainer}>
      {lines.filter(f => f).map((line, i) => (
        <Typography key={`${line}${i}`} variant="body2">
          {line}
        </Typography>
      ))}
    </div>
  )
}

export default function BeerCard(props: BeerCardProps) {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h4">
            { props.name }
          </Typography>
          <Typography variant="h6" textTransform="capitalize" gutterBottom>
            { props.brewery_type }
          </Typography>
          <MapPreview 
            className={styles.mapContainer}
            lat={ convertCoord(props.latitude) }
            lng={ convertCoord(props.longitude) }
          />
          <Address 
            lines={[props.address_1, props.address_2, props.address_3]}
          />
          <Typography variant="body2">
            { props.city }, { props.state }
          </Typography>
          <Typography variant="body2">
            {props.country}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            <Link href={props.website_url}>
              Website
            </Link>
          </Button>
          <Button size="small" color="primary">
            <Link href={`tel:${props.phone}`}>
              Phone
            </Link>
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}