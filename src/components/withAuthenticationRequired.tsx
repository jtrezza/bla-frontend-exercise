import React, { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { Box, CircularProgress } from '@mui/material';

export function withAuthenticationRequired<P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P> {
  const ComponentWithAuth: React.FC<P> = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const auth = localStorage.getItem('authenticated') === 'true';
        setIsAuthenticated(auth);
        if (!auth) {
          redirect('/login');
        }
      }
    }, []);

    if (isAuthenticated === null) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      );
    }

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  ComponentWithAuth.displayName = `withAuthenticationRequired(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return ComponentWithAuth;
}
