import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Pokedex } from './pokedex/pokedex';
import { Search } from './search/search';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Pokedex, Search],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'ngPokedex';
}
