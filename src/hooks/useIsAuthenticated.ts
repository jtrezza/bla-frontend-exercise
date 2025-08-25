import { useState, useEffect } from 'react';

const AUTH_KEY = 'authenticated';

export function useIsAuthenticated() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Only access localStorage on the client
    if (typeof window !== 'undefined') {
      setIsAuthenticated(localStorage.getItem(AUTH_KEY) === 'true');

      const handleStorage = () => {
        setIsAuthenticated(localStorage.getItem(AUTH_KEY) === 'true');
      };

      window.addEventListener('storage', handleStorage);
      return () => window.removeEventListener('storage', handleStorage);
    }
  }, []);

  return { isAuthenticated };
}
