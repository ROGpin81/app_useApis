export interface TypeListResponse {
  count: number;
  results: PokemonTypeItem[];
}

export interface PokemonTypeItem {
  name: string;
  url: string;
}