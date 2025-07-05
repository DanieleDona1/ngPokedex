import { Component, DoCheck } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team-pokedex',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-pokedex.html',
  styleUrl: './team-pokedex.scss',
})
export class TeamPokedex {
  storedTeam: any[] = [];

  ngOnInit(): void {
    this.loadPokemonTeam();
  }

  loadPokemonTeam(): void {
    const teamString = localStorage.getItem('pokemonTeam');
    this.storedTeam = teamString ? JSON.parse(teamString) : [];
    console.log('Loaded Pokémon Team:', this.storedTeam);
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
}
