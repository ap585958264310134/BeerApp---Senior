import { useState, useEffect } from 'react';

import type { Beer } from 'types';
import { getBeerList } from 'api';
import handle from 'utils/error';
import { useOnline } from './useOnline';

const LOCAL_STORAGE_KEY = 'USE_BEER_DATA';

export function useBeerData() {
  const [isLoading, setLoadingStatus] = useState(false);
  const isOffline = useOnline();
  const [beerData, setBeerData] = useState<Array<Beer>>(() => {
    const value = localStorage.getItem(LOCAL_STORAGE_KEY);
    return value && isOffline ? JSON.parse(value) : [];
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingStatus(true);

        const response = await getBeerList();

        setBeerData(response.data);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(response.data));
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