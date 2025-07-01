import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Pokedex } from './pokedex/pokedex';
import { Search } from './search/search';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Pokedex, Search],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  currentSearchTerm: string = '';
  currentTypeFilter: string = '';

  onSearchTermChanged(term: string): void {
    this.currentSearchTerm = term;
    this.currentTypeFilter = '';
  }

  onTypeFilter(type: string): void {
    this.currentTypeFilter = type;
    this.currentSearchTerm = '';
  }
}
