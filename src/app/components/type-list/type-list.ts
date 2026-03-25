import { Component, OnInit } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

import { PokeapiService } from '../../services/pokeapi.service';
import { TypeListResponse } from '../../models/type-list.interface';

@Component({
  selector: 'app-type-list',
  imports: [TitleCasePipe],
  templateUrl: './type-list.html',
  styleUrl: './type-list.css'
})
export class TypeListComponent implements OnInit {
  tipos: TypeListResponse = {
    count: 0,
    results: []
  };

  cargando: boolean = true;
  error: string = '';

  constructor(private pokeapiService: PokeapiService) {}

  ngOnInit(): void {
    this.pokeapiService.getTypes().subscribe({
      next: (respuesta) => {
        this.tipos = respuesta;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los tipos.';
        this.cargando = false;
      }
    });
  }
}