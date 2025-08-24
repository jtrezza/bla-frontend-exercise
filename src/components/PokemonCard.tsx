import { Pokemon } from '@/lib/types';
import { Card, CardContent, CardMedia, Typography, Chip } from '@mui/material';
import { capitalizeFirstLetter, getLastUrlSection } from '@/lib/utils/strings';

export default function PokemonCard(props: Pokemon) {
  const number = getLastUrlSection(props.url);
  return (
    <Card sx={{ boxShadow: 3, mb: 2, cursor: 'pointer', position: 'relative' }}>
      <Chip
        label={`#${number}`}
        sx={{ position: 'absolute', top: 16, right: 16, fontWeight: '500', fontSize: '0.875rem' }}
      />

      <CardMedia
        sx={{ height: { xs: 100, md: 222 }, backgroundSize: 'contain', backgroundPosition: 'center', mt: 2 }}
        image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${number}.svg`}
        title={props.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h2" sx={{ textAlign: 'center', fontSize: { xs: '1.5rem', md: '2rem' } }}>
          {capitalizeFirstLetter(props.name)}
        </Typography>
      </CardContent>
    </Card>
  );
}
