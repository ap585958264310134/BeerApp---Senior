import { useState, useEffect } from "react";

export function useOnline(): boolean {
  const [isOnline, setIsOnline] = useState(true);

  const setOnline = () => setIsOnline(true);
  const setOffline = () => setIsOnline(false);

  useEffect(() => {
    window.addEventListener('online', setOnline);
    window.addEventListener('offline', setOffline);

    return () => {
      window.addEventListener('online', setOnline);
      window.addEventListener('offline', setOffline);
    };
  }, []);

  return isOnline;
}