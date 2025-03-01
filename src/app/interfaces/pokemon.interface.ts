export interface PokemonListResponse {
  count: number;
  next: string;
  previous: string | null;
  results: Pokemon[];
}

export interface Pokemon {
  name: string;
  url: string;
  image: string;
  abilities: string[];
  types: string[];
  weight: number;
  height: number;
}