import { useParams } from 'react-router-dom';
import BeerCard from '../../components/BeerCard';
import { useBeerData } from 'hooks/useBeerData';

const Beer = () => {
  const { id } = useParams();
  const {
    beerData
  } = useBeerData();

  const beer = beerData.find(beer => beer.id === id);
  
  if (!beer) {
    return <span>Loading...</span>;
  }

  return (
    <BeerCard 
      {...beer}
    />
  )
};

export default Beer;
