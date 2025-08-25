'use client';

import { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Paper, Alert, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import { authenticate } from '@/lib/api/auth';
import { LoginFormData } from '@/lib/types';
import { useIsAuthenticated } from '@/hooks/useIsAuthenticated';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { isAuthenticated } = useIsAuthenticated();

  if (isAuthenticated) {
    window.location.href = '/';
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFormError,
    reset,
  } = useForm<LoginFormData>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    setLoading(true);
    try {
      const authenticated = await authenticate(data.username, data.password);
      if (authenticated) {
        localStorage.setItem('authenticated', 'true');
        window.location.href = '/';
      }
      reset();
    } catch (err) {
      setError('Authentication failed');
      setFormError('username', { type: 'manual', message: ' ' });
      setFormError('password', { type: 'manual', message: ' ' });
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated === null || isAuthenticated) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundImage: 'linear-gradient(180deg, #fa5656 0%, #fa5656 35%, transparent 90%)',
        backgroundAttachment: 'fixed',
        minHeight: '100dvh',
        position: 'relative',
        '::before': {
          content: '""',
          position: 'fixed',
          zIndex: 1,
          left: 0,
          top: 0,
          width: '100vw',
          height: '100vh',
          background: 'url(/pokeball.svg) center center no-repeat',
          backgroundSize: 'contain',
          opacity: 0.12,
          pointerEvents: 'none',
        },
      }}
    >
      <Container
        maxWidth="xs"
        sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%', zIndex: 10 }}>
          <Typography variant="h2" align="center" gutterBottom>
            Pokédex
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              autoComplete="username"
              error={!!errors.username}
              helperText={errors.username?.message}
              {...register('username', { required: 'Username is required' })}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register('password', { required: 'Password is required' })}
            />
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, bgcolor: '#fdd455', color: 'text.primary', fontWeight: 'bold' }}
              disabled={loading}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
