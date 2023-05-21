import { useState, useEffect } from 'react';

import type { Beer } from 'types';
import { getBeerList } from 'api';
import handle from 'utils/error';

export function useBeerData() {
  const [isLoading, setLoadingStatus] = useState(false);
  const [beerData, setBeerData] = useState<Array<Beer>>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingStatus(true);

        const response = await getBeerList();

        setBeerData(response.data);
      } catch (error) {
        handle(error);
      } finally {
        setLoadingStatus(false);
      }
    }

    fetchData();
  }, []);

  return {
    isLoading,
    beerData
  }
}