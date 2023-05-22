import { useParams } from 'react-router-dom';
import BeerCard from '../../components/BeerCard';
import { useBeerData } from 'hooks/useBeerData';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

const Beer = () => {
  const { id } = useParams();
  const {
    beerData
  } = useBeerData();

  const beer = beerData.find(beer => beer.id === id);

  if (!beer) {
    return (
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">
          <CardContent>
            Loading...
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <BeerCard 
      {...beer}
    />
  )
};

export default Beer;
