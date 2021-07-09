import { Component, OnInit } from '@angular/core';

import { PublisherOption } from '../../interfaces/interfaces-camilo/publisher-option.interface';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../components/confirm/confirm.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }

  `]
})
export class AgregarComponent implements OnInit {

  public publishers: PublisherOption[] = [
    {
      id:   'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id:   'Marvel Comics',
      desc: 'Marvel - Comics'
    },
  ];

  public hero: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }


  constructor(
    private _heroesService : HeroesService,
    private _activatedRoute: ActivatedRoute,
    private _router        : Router,
    private _snackBar      : MatSnackBar,
    private _dialog        : MatDialog
  ) { }

  ngOnInit(): void {


    if( this._router.url.includes('editar') ){

      this._activatedRoute.params
        .pipe(
          switchMap( ({ id }) => this._heroesService.getHeroePorId( id ) )
        )
        .subscribe( hero => this.hero = hero );
    }


  }



  public saveHero(): void{

    if( this.hero.superhero.trim().length !== 0 ){
      if ( this.hero.id ){
        this._heroesService.updateHero(this.hero)
          .subscribe( hero => {
            this.showSnackbar(this.hero.superhero + ' has been updated!');
          } );
      }
      else {
        this._heroesService.addHero( this.hero )
          .subscribe( hero => {
            this._router.navigate(['/heroes/editar', hero.id])
            this.showSnackbar(this.hero.superhero + ' has been created!');
          })
      }
    }
  }


  public deleteHero(): void {

    const dialog = this._dialog.open( ConfirmComponent, {
      width: '250px',
      data:  {...this.hero}
    });

    dialog.afterClosed()
      .subscribe( result => {
        if (result ) {
          this._heroesService.deleteHero( this.hero.id! )
          .subscribe( reply => {
            this._router.navigate(['/heroes']);
          });
        }
      });

  }


  public showSnackbar( message: string): void {

    this._snackBar.open( message, 'ok!', {
      duration: 2500
    });
  }

}
