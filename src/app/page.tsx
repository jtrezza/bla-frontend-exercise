'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { Card, CardContent, Typography, Box, Container, CircularProgress, Grid } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { fetchPokemonPage } from '@/lib/api/pokemon';
import { PAGE_SIZE } from '@/lib/constants';
import { Pokemon, PokemonPage } from '@/lib/types';
import PokemonCard from '@/components/PokemonCard';
import PokemonDialog from '@/components/PokemonDialog';

export default function Home() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

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
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Pokémon List
      </Typography>
      {status === 'pending' && <CircularProgress />}
      {status === 'error' && <Typography color="error">{(error as Error).message}</Typography>}
      <Grid spacing={2} container>
        {data?.pages.flatMap((page: PokemonPage) =>
          page.results.map((pokemon: Pokemon) => (
            <Grid key={pokemon.name} size={6}>
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
  );
}
