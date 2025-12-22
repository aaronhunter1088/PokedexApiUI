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

  override getPokemonList(_limit: number, _offset: number) {
    const interval = {
      limit: _limit ? Math.min(_limit,10) : 10,
      offset: _offset ? _offset : 0
    }
    console.debug("URL: " + this.apiUrl+"/pokemon?limit="+interval.limit+"&offset="+interval.offset);
    return this.callURL(this.apiUrl+"/pokemon", interval)
        .pipe(map((response: any) => response)
    );
  }
}
