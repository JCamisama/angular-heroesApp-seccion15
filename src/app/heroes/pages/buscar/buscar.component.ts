import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  public term  : string  = '';
  public heroes: Heroe[] = [];

  public selectedHero : Heroe | undefined;

  constructor(
    private _heroesService: HeroesService
  ) { }

  ngOnInit(): void {
  }



  public searching(): void {

    this._heroesService.getSuggestions(this.term.trim())
      .subscribe( heroes => this.heroes = heroes);
  }



  public selectedOption(event: MatAutocompleteSelectedEvent): void {

    const hero: Heroe = event.option.value;

    if(hero){
      this.term = hero.superhero;

      this._heroesService.getHeroePorId( hero.id! )  // Trust me, I'm an engineer
        .subscribe( currentHero => this.selectedHero = currentHero);
    }
    else{
      this.selectedHero = undefined;
    }
  }





}
