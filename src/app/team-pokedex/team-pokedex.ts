import { Component, DoCheck } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team-pokedex',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-pokedex.html',
  styleUrl: './team-pokedex.scss'
})
export class TeamPokedex {
  // team: any[] = [];

  // ngDoCheck(): void {
  //   this.team = JSON.parse(localStorage.getItem('pokemonTeam') || '[]');
  // }
}
