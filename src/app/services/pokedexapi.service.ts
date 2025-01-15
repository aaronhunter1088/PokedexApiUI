import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokemonService } from './pokemon.service';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class PokedexApiService extends PokemonService {

  constructor(http: HttpClient) {
    super(http);
  }

  //savedPageNumber: number = 1;
  //pokemonID: number = 0;
  //itemsPerPage: number = 10

  override getPokemonList(_limit: number, _offset: number) {
    const interval = {
      limit: _limit ? _limit : 10,
      offset: _offset ? _offset : 0
    }
    return this.http.get('http://localhost:8080/pokemon', { params: interval }).pipe(
      map((response: any) => response)
    );
  }
}
