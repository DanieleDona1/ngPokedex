import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-pokedex',
  standalone: true,
  imports: [],
  templateUrl: './team-pokedex.html',
  styleUrl: './team-pokedex.scss'
})
export class TeamPokedex implements OnInit {
  team: any[] = [];

  ngOnInit(): void {
    this.team = JSON.parse(localStorage.getItem('pokemonTeam') || '[]');
  }
}
