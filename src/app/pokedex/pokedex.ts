import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokedex.html',
  styleUrl: './pokedex.scss'
})
export class Pokedex implements OnInit, OnChanges {
  @Input() searchTerm: string = '';
  @Input() typeFilter: string = '';

  allPokemons: any[] = [];
  pokemons: any[] = [];
  selectedPokemon: any | null = null;
  activeDetailTab: 'main' | 'stats' | 'evo' = 'main';
  private BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadPokemons(0, 151).subscribe(pokemons => {
      this.allPokemons = pokemons;
      this.pokemons = this.allPokemons;
      console.log('Geladene Pokémon:', this.pokemons);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm'] || changes['typeFilter']) {
      this.filterPokemons();
    }
  }

  filterPokemons(): void {
    if (this.typeFilter) {
      this.pokemons = this.allPokemons.filter(pokemon =>
        pokemon.types.includes(this.typeFilter)
      );
    } else if (!this.searchTerm || this.searchTerm.length < 3) {
      this.pokemons = this.allPokemons;
    } else {
      this.pokemons = this.allPokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  loadPokemons(start: number, end: number): Observable<any[]> {
    const pokemonRequests: Observable<any>[] = [];

    for (let i = start + 1; i <= end; i++) {
      const pokemonUrl = this.BASE_URL + `${i}`;
      pokemonRequests.push(this.http.get<any>(pokemonUrl).pipe(
        map(data => {
          return {
            id: data.id,
            name: data.name,
            image: data.sprites.other['official-artwork'].front_default,
            image_showdown: data.sprites.front_shiny,
            types: data.types.map((t: any) => t.type.name),
            type: data.types[0].type.name,
            height: data.height / 10,
            weight: data.weight / 10,
            baseExperience: data.base_experience,
            abilities: data.abilities.map((a: any) => this.capitalizeFirstLetter(a.ability.name)).join(', '),
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            special_attack: data.stats[3].base_stat,
            special_defense: data.stats[4].base_stat,
            speed: data.stats[5].base_stat,
          };
        })
      ));
    }
    return forkJoin(pokemonRequests);
  }

  capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  openPokemonDetails(pokemon: any): void {
    this.selectedPokemon = pokemon;
    this.activeDetailTab = 'main';
  }

  closeDialog(): void {
    this.selectedPokemon = null;
  }

  previousPkm(): void {
    const currentIndex = this.pokemons.findIndex(p => p.id === this.selectedPokemon.id);
    if (currentIndex > 0) {
      this.selectedPokemon = this.pokemons[currentIndex - 1];
    }
  }

  nextPkm(): void {
    const currentIndex = this.pokemons.findIndex(p => p.id === this.selectedPokemon.id);
    if (currentIndex < this.pokemons.length - 1) {
      this.selectedPokemon = this.pokemons[currentIndex + 1];
    }
  }

  addToTeam(pokemon: any, event: Event): void {
    event.stopPropagation();
    const team = JSON.parse(localStorage.getItem('pokemonTeam') || '[]');
    if (!team.some((p: any) => p.id === pokemon.id)) {
      team.push(pokemon);
      localStorage.setItem('pokemonTeam', JSON.stringify(team));
    }
  }
}
