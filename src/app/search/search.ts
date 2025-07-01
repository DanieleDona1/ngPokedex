import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './search.html',
  styleUrl: './search.scss'
})
export class Search {
  @Output() searchTermChange = new EventEmitter<string>();
  @Output() typeFilter = new EventEmitter<string>();

  activeType: string = '';

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTermChange.emit(input.value);
  }

  filterByType(type: string): void {
    if (this.activeType === type) {
      this.activeType = '';
      this.typeFilter.emit('');
    } else {
      this.activeType = type;
      this.typeFilter.emit(type);
    }
  }
}
