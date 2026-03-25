import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

import { PokeapiService } from '../../services/pokeapi.service';
import { PokemonListResponse } from '../../models/pokemon-list.interface';

@Component({
  selector: 'app-pokemon-list',
  imports: [RouterLink, TitleCasePipe],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.css'
})
export class PokemonListComponent implements OnInit {
  pokemons: PokemonListResponse = {
    count: 0,
    next: null,
    previous: null,
    results: []
  };

  limite: number = 12;
  cargando: boolean = true;
  error: string = '';

  constructor(private pokeapiService: PokeapiService) {}

  ngOnInit(): void {
    this.cargarPokemons();
  }

  cargarPokemons(): void {
    this.cargando = true;
    this.error = '';

    this.pokeapiService.getPokemons(this.limite).subscribe({
      next: (respuesta) => {
        this.pokemons = respuesta;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo cargar la lista de Pokémon.';
        this.cargando = false;
      }
    });
  }
}