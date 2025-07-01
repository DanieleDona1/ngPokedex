import { Routes } from '@angular/router';
import { Pokedex } from './pokedex/pokedex';
import { TeamPokedex } from './team-pokedex/team-pokedex';

export const routes: Routes = [
  { path: '', component: Pokedex },
  { path: 'team', component: TeamPokedex }
];
