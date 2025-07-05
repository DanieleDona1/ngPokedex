import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SearchFilterService } from '../services/search-filter-service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  private searchFilterService = inject(SearchFilterService);

  currentSearchTerm: string = '';

  onSearch(inputValue: string) {
    console.log(inputValue);
    this.searchFilterService.setCurrentSearchTerm(inputValue);
  }

  setFilterPokemonsByType(type: string){
    this.searchFilterService.toggleType(type);
    console.log('test');
  }
}
