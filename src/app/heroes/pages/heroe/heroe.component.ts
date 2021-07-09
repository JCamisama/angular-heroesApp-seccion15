import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap, tap } from 'rxjs/operators';
@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img {
      width:         100%;
      border-radius: 5px;
    }
  `]
})
export class HeroeComponent implements OnInit {

  public hero !: Heroe;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _heroesService: HeroesService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._activatedRoute.params
      .pipe(
        switchMap( (param) => this._heroesService.getHeroePorId(param.id) ),
        tap( console.log )
      )
      .subscribe( hero => this.hero = hero);
  }

  public regresar(): void {
    this._router.navigate(['/heroes/listado']);
  }

}
