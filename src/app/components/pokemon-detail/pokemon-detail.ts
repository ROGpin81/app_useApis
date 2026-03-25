import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

import { PokeapiService } from '../../services/pokeapi.service';
import { PokemonDetail } from '../../models/pokemon-detail.interface';

@Component({
  selector: 'app-pokemon-detail',
  imports: [RouterLink, TitleCasePipe],
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.css'
})
export class PokemonDetailComponent implements OnInit {
  pokemon: PokemonDetail = {
    id: 0,
    name: '',
    height: 0,
    weight: 0,
    sprites: {
      front_default: '',
      back_default: ''
    },
    types: []
  };

  cargando: boolean = true;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private pokeapiService: PokeapiService
  ) {}

  ngOnInit(): void {
    const nombre = this.route.snapshot.paramMap.get('name');

    if (nombre) {
      this.pokeapiService.getPokemonDetail(nombre).subscribe({
        next: (respuesta) => {
          this.pokemon = respuesta;
          this.cargando = false;
        },
        error: () => {
          this.error = 'No se pudo cargar el detalle del Pokémon.';
          this.cargando = false;
        }
      });
    } else {
      this.error = 'No se recibió el nombre del Pokémon.';
      this.cargando = false;
    }
  }
}