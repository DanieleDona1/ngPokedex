import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [],
  templateUrl: './pokedex.html',
  styleUrl: './pokedex.scss'
})
export class Pokedex implements OnInit {

  private BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadPokemons(0, 20).subscribe(pokemons => {
      console.log('Geladene Pokémon:', pokemons);
    });
  }

  loadPokemons(start: number, end: number): Observable<any[]> {
    const pokemonRequests: Observable<any>[] = [];

    for (let i = start + 1; i <= end; i++) {
      const pokemonUrl = this.BASE_URL + `${i}`;
      pokemonRequests.push(this.http.get<any>(pokemonUrl).pipe(
        map(data => {
          return data;
        })
      ));
    }
    return forkJoin(pokemonRequests);
  }
}
