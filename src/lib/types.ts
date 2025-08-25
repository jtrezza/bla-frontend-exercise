export type EmptyRequestType = undefined;

export type Pokemon = {
  name: string;
  url: string;
};

export type PokemonPage = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
  offset: number;
};

export type PokemonDetail = {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: { ability: { name: string; url: string } }[];
  moves: { move: { name: string; url: string } }[];
  forms: { name: string; url: string }[];
  stats: { base_stat: number; effort: number; stat: { name: string; url: string } }[];
  types: { slot: number; type: { name: string; url: string } }[];
};

export type LoginFormData = {
  username: string;
  password: string;
};
