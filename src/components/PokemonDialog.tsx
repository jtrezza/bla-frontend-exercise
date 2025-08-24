import {
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  Typography,
  Box,
  IconButton,
  Tabs,
  Tab,
  Chip,
  Stack,
} from '@mui/material';
import Image from 'next/image';
import CloseIcon from '@mui/icons-material/Close';
import { useQuery } from '@tanstack/react-query';
import { capitalizeFirstLetter } from '@/lib/utils/strings';
import { useState } from 'react';
import { PokemonDetail } from '@/lib/types';

interface PokemonDialogProps {
  open: boolean;
  url: string | null;
  onClose: () => void;
}

const typeBgDict: { [key: string]: string } = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
  stellar: '#F5F5F5',
  shadow: '#4B4B4B',
  unknown: '#68A090',
};

const whiteTextTypes = new Set(['dark', 'dragon', 'ghost', 'steel', 'shadow', 'poison', 'psychic', 'water']);

export default function PokemonDialog({ open, url, onClose }: PokemonDialogProps) {
  const [tab, setTab] = useState(0);
  const { data, isLoading, error } = useQuery<PokemonDetail | null>({
    queryKey: ['pokemon-detail', url],
    queryFn: async (): Promise<PokemonDetail | null> => {
      if (!url) return null;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch Pokémon details');
      return res.json() as Promise<PokemonDetail>;
    },
    enabled: !!url && open,
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pl: 3,
          pr: 1,
          pt: 2,
          ...(data ? { backgroundColor: typeBgDict[data.types[0].type.name] } : {}),
        }}
      >
        <Box sx={{ flex: 1, textAlign: 'center' }}>
          {data && (
            <DialogTitle
              sx={{
                fontWeight: 700,
                ...(data ? { color: whiteTextTypes.has(data.types[0].type.name) ? 'white' : 'inherit' } : {}),
              }}
            >
              {capitalizeFirstLetter(data.name)}
            </DialogTitle>
          )}
        </Box>
        <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent sx={{ px: 0, pt: 0 }}>
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        )}
        {error && <Typography color="error">{(error as Error).message}</Typography>}
        {data && (
          <>
            <Box
              sx={{
                pt: 2,
                pb: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                background: `linear-gradient(180deg, ${typeBgDict[data.types[0].type.name]} 0%, transparent 50%)`,
              }}
            >
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
                alt={data.name}
                width={180}
                height={180}
                style={{ objectFit: 'contain', marginBottom: 16, zIndex: 2, marginTop: 18 }}
                unoptimized
              />
              <Image
                src="/pokeball.svg"
                alt="Pokeball background"
                height={232}
                width={232}
                style={{ objectFit: 'contain', opacity: 0.2, zIndex: 1, position: 'absolute', rotate: '135deg' }}
                unoptimized
                sizes="200px"
              />
            </Box>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              {data.types.map((t) => (
                <Chip
                  key={t.type.name}
                  label={capitalizeFirstLetter(t.type.name)}
                  sx={{
                    mt: 2,
                    mb: 1,
                    mr: 1,
                    backgroundColor: typeBgDict[t.type.name],
                    color: whiteTextTypes.has(t.type.name) ? 'white' : 'black',
                    fontWeight: 'bold',
                  }}
                />
              ))}
            </Box>
            <Tabs
              value={tab}
              onChange={(_, newValue) => setTab(newValue)}
              sx={{ mt: 2, mb: 2 }}
              aria-label="pokemon details tabs"
              centered
            >
              <Tab label="Abilities" />
              <Tab label="Moves" />
              <Tab label="Forms" />
            </Tabs>
            {tab === 0 && (
              <Box sx={{ width: '100%', px: 4 }}>
                <Stack>
                  {data.abilities.map((abilityInfo) => (
                    <Typography key={abilityInfo.ability.name}>
                      {capitalizeFirstLetter(abilityInfo.ability.name)}
                    </Typography>
                  ))}
                </Stack>
                {/* You can map data.abilities here */}
              </Box>
            )}
            {tab === 1 && (
              <Box sx={{ width: '100%', px: 4 }}>
                <Stack sx={{ maxHeight: 200, overflowY: 'auto' }}>
                  {data.moves.map((moveInfo) => (
                    <Typography key={moveInfo.move.name}>{capitalizeFirstLetter(moveInfo.move.name)}</Typography>
                  ))}
                </Stack>
              </Box>
            )}
            {tab === 2 && (
              <Box sx={{ width: '100%', px: 4 }}>
                <Stack>
                  {data.forms.map((formInfo) => (
                    <Typography key={formInfo.name}>{capitalizeFirstLetter(formInfo.name)}</Typography>
                  ))}
                </Stack>
              </Box>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
