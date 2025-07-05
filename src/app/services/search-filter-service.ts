import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchFilterService {
  private currentSearchTermSubject = new BehaviorSubject<string>('');
  currentSearchTerm$: Observable<string> =
    this.currentSearchTermSubject.asObservable();

  setCurrentSearchTerm(value: string) {
    this.currentSearchTermSubject.next(value);
  }

  filterPokemonsByName(pokemonList: any[]) {
    return pokemonList.filter((pokemon) =>
      pokemon.name
        .toLowerCase()
        .includes(this.currentSearchTermSubject.value.toLowerCase())
    );
  }

  private currentFilterTypesSubject = new BehaviorSubject<string[]>([]);
  currentFilterTypes$: Observable<string[]> = this.currentFilterTypesSubject.asObservable();

  toggleType(type: string) {
    const types = this.currentFilterTypesSubject.value;
    if (types.includes(type)) {
      const types = this.currentFilterTypesSubject.value.filter(
        (t) => t !== type
      );
      this.currentFilterTypesSubject.next(types);
      console.log('Remove Type:', this.currentFilterTypesSubject);
    } else {
      const types = this.currentFilterTypesSubject.value;
      if (!types.includes(type)) {
        this.currentFilterTypesSubject.next([...types, type]);
      }
      console.log('AddType:', this.currentFilterTypesSubject);
    }
  }

  filterPokemonsByType(pokemonList: any[]) {
    // return pokemonList.filter(pokemon =>
    //   pokemon.types.some((p: any) => p.type.name === this.currentFilterTypeSubject.value)
    // );
  }
}

// return pokemonList.filter(pokemon =>
//   pokemon.types.some((p: any) => p.type.name === this.currentFilterTypeSubject.value)
// );
