import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { PokemonListResponse } from '../models/pokemon-list.interface';
import { PokemonDetail } from '../models/pokemon-detail.interface';
import { TypeListResponse } from '../models/type-list.interface';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
  private baseUrl: string = 'https://pokeapi.co/api/v2';

  private pokemonListCache: PokemonListResponse | null = null;
  private typesCache: TypeListResponse | null = null;
  private pokemonDetailCache: { [key: string]: PokemonDetail } = {};

  constructor(private http: HttpClient) {}

  getPokemons(limit: number = 12): Observable<PokemonListResponse> {
    if (this.pokemonListCache) {
      return of(this.pokemonListCache);
    }

    return this.http
      .get<PokemonListResponse>(`${this.baseUrl}/pokemon?limit=${limit}`)
      .pipe(
        tap((respuesta) => {
          this.pokemonListCache = respuesta;
        })
      );
  }

  getPokemonDetail(idOrName: string): Observable<PokemonDetail> {
    const key = idOrName.toLowerCase();

    if (this.pokemonDetailCache[key]) {
      return of(this.pokemonDetailCache[key]);
    }

    return this.http
      .get<PokemonDetail>(`${this.baseUrl}/pokemon/${idOrName}`)
      .pipe(
        tap((respuesta) => {
          this.pokemonDetailCache[key] = respuesta;
        })
      );
  }

  getTypes(): Observable<TypeListResponse> {
    if (this.typesCache) {
      return of(this.typesCache);
    }

    return this.http
      .get<TypeListResponse>(`${this.baseUrl}/type`)
      .pipe(
        tap((respuesta) => {
          this.typesCache = respuesta;
        })
      );
  }
}