import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Pokedex } from './pokedex/pokedex';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Pokedex],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'ngPokedex';
}
