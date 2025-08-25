'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import {
  Typography,
  Box,
  Container,
  CircularProgress,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { fetchPokemonPage } from '@/lib/api/pokemon';
import { PAGE_SIZE } from '@/lib/constants';
import { Pokemon, PokemonPage } from '@/lib/types';
import PokemonCard from '@/components/PokemonCard';
import PokemonDialog from '@/components/PokemonDialog';

export default function Home() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCardClick = (url: string) => {
    setSelectedUrl(url);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedUrl(null);
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, error } = useInfiniteQuery({
    queryKey: ['pokemon'],
    queryFn: fetchPokemonPage,
    getNextPageParam: (lastPage: PokemonPage) => {
      if (!lastPage.next) return undefined;
      return lastPage.offset + PAGE_SIZE;
    },
    initialPageParam: 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !searchValue) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, searchValue]);

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
      <Container maxWidth="md">
        <Typography variant="h1" gutterBottom sx={{ color: 'white', pt: 2 }}>
          Pokédex
        </Typography>
      </Container>

      {showScrollTop && (
        <IconButton
          onClick={handleScrollToTop}
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            zIndex: 1200,
            background: 'white',
            boxShadow: 3,
            borderRadius: '50%',
            width: 48,
            height: 48,
            '&:hover': { background: '#eee' },
          }}
          aria-label="scroll to top"
        >
          <KeyboardArrowUpIcon fontSize="large" />
        </IconButton>
      )}

      <Container
        maxWidth="md"
        sx={{ position: 'sticky', top: 0, mb: 2, backgroundColor: '#fa5656', pt: 1, pb: 1, zIndex: 10 }}
      >
        {status === 'success' && (
          <Box>
            <TextField
              value={searchValue}
              variant="outlined"
              sx={{
                width: '100%',
                backgroundColor: 'white',
                borderRadius: 8,
                mb: 1,
                '& .MuiOutlinedInput-root': { '& fieldset': { border: 'none' } },
              }}
              placeholder="Type to search among the loaded Pokémon"
              onChange={(e) => setSearchValue(e.target.value)}
              InputProps={{
                endAdornment: searchValue && (
                  <InputAdornment position="end">
                    <IconButton aria-label="clear search" onClick={() => setSearchValue('')} edge="end">
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Typography sx={{ color: 'white', fontWeight: 500 }}>Scroll down to load more Pokémon</Typography>
          </Box>
        )}
      </Container>
      <Container maxWidth="md">
        {status === 'pending' && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
            <CircularProgress />
          </Box>
        )}
        {status === 'error' && <Typography color="error">{(error as Error).message}</Typography>}
        <Grid spacing={2} container>
          {data?.pages.flatMap((page: PokemonPage) =>
            page.results
              .filter((pokemon: Pokemon) => pokemon.name.toLowerCase().includes(searchValue.toLowerCase()))
              .map((pokemon: Pokemon) => (
                <Grid key={pokemon.name} size={6} sx={{ zIndex: 2 }}>
                  <div onClick={() => handleCardClick(pokemon.url)} style={{ cursor: 'pointer' }}>
                    <PokemonCard {...pokemon} />
                  </div>
                </Grid>
              ))
          )}
        </Grid>
        <PokemonDialog open={dialogOpen} url={selectedUrl} onClose={handleDialogClose} />
        <Box ref={ref} sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          {isFetchingNextPage && <CircularProgress />}
        </Box>
      </Container>
    </Box>
  );
}
