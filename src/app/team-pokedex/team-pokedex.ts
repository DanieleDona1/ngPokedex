import { Component, DoCheck, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFilterService } from '../services/search-filter-service';

@Component({
  selector: 'app-team-pokedex',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-pokedex.html',
  styleUrl: './team-pokedex.scss',
})
export class TeamPokedex {
  private searchFilterService = inject(SearchFilterService);

  allTeam: any[] = [];
  displayTeam: any[] = [];

  ngOnInit(): void {
    this.loadPokemonTeam();

    this.searchFilterService.currentSearchTerm$.subscribe(() => {
      this.displayTeam = this.searchFilterService.filterPokemons(this.allTeam);
    });

    this.searchFilterService.currentFilterTypes$.subscribe(() => {
      this.displayTeam = this.searchFilterService.filterPokemons(this.allTeam);
    });
  }

  loadPokemonTeam(): void {
    const teamString = localStorage.getItem('pokemonTeam');
    this.allTeam = teamString ? JSON.parse(teamString) : [];
    console.log('Loaded Pokémon Team:', this.allTeam);
    this.displayTeam = this.allTeam;
  }

  addToTeam(pokemon: any, event: Event): void {
    event.stopPropagation();
    const team = JSON.parse(localStorage.getItem('pokemonTeam') || '[]');
    const index = team.findIndex((p: any) => p.id === pokemon.id);

    team.splice(index, 1);

    localStorage.setItem('pokemonTeam', JSON.stringify(team));
    this.loadPokemonTeam();
  }

  isInTeam(pokemon: any): boolean {
    const team = JSON.parse(localStorage.getItem('pokemonTeam') || '[]');
    return team.some((p: any) => p.id === pokemon.id);
  }

  capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
