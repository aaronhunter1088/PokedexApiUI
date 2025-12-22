import {TestBed} from '@angular/core/testing';

import {PokedexApiService} from './pokedexapi.service';

describe('PokedexApiService', () => {
    let service: PokedexApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PokedexApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
