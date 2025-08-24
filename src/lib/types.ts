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
