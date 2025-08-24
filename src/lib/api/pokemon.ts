import { QueryFunctionContext } from '@tanstack/react-query';
import { PAGE_SIZE } from '@/lib/constants';

export async function fetchPokemonPage({ pageParam }: QueryFunctionContext) {
  const offset = typeof pageParam === 'number' ? pageParam : 0;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${PAGE_SIZE}`);
  if (!res.ok) throw new Error('Network response was not ok');
  const data = await res.json();
  return { ...data, offset };
}
