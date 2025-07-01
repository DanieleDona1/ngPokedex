import { TestBed } from '@angular/core/testing';

import { LoadPokemon } from './load-pokemon';

describe('LoadPokemon', () => {
  let service: LoadPokemon;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadPokemon);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
