import { QueryFunctionContext } from '@tanstack/react-query';
import { PAGE_SIZE } from '@/lib/constants';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://pokeapi.co/api/v2';

export async function fetchPokemonPage({ pageParam }: QueryFunctionContext) {
  const offset = typeof pageParam === 'number' ? pageParam : 0;
  const res = await fetch(`${BASE_URL}/pokemon?offset=${offset}&limit=${PAGE_SIZE}`);
  if (!res.ok) throw new Error('Network response was not ok');
  const data = await res.json();
  return { ...data, offset };
}
