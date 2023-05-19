import { useEffect, useState } from 'react';
import { Beer as IBeer } from '../../types';
import { fetchData } from './utils';
import { useParams } from 'react-router-dom';
import BeerCard from '../../components/BeerCard';

const Beer = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeer, id), [id]);

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
