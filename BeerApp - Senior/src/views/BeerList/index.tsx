import BeerList from 'components/BeerList';
import { useNavigate } from 'react-router-dom';
import { useBeerData } from 'hooks/useBeerData';

const BeerListView = () => {
  const navigate = useNavigate();

  const {
    beerData
  } = useBeerData();

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  return (
    <article>
      <section>
        <header>
          <h1>BeerList page</h1>
        </header>
        <main>
          {beerData && <BeerList
            beers={beerData}
            onElementClick={onBeerClick}
            elementsPerPage={5}
          />}
        </main>
      </section>
    </article>
  );
};

export default BeerListView;
