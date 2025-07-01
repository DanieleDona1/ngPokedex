import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPokedex } from './team-pokedex';

describe('TeamPokedex', () => {
  let component: TeamPokedex;
  let fixture: ComponentFixture<TeamPokedex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamPokedex]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamPokedex);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
