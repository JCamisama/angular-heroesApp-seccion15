import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { Auth } from '../interfaces/auth.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = environment.baseUrl;
  private _auth:    Auth | undefined;

  constructor(
    private _http: HttpClient
  ) { }

  get auth(): Auth {
    return {...this._auth! };
  }

  public login(): Observable<Auth>{

    return this._http.get<Auth>(`${this._baseUrl}/usuarios/1`)
              .pipe(
                tap( auth => this._auth = auth),
                tap( auth => localStorage.setItem('token', auth.id))
              );
  }


  public checkAuthentication(): Observable<boolean> {

    if ( !localStorage.getItem('token') ){
      return of(false);
    }

    return this._http.get<Auth>(`${this._baseUrl}/usuarios/1`)
            .pipe(
              map( auth => {
                this._auth = auth;
                return true;
              })
            );
  }




  public logout(): void {
    this._auth = undefined;
    localStorage.removeItem('token');
  }



  // public checkAuthentication(): Observable<boolean> | boolean {

  //   if ( localStorage.getItem('token') ){
  //     return false;
  //   }

  //   return this._http.get<Auth>(`${this._baseUrl}/usuarios/1`)
  //           .pipe(
  //             map( auth => {
  //               console.log('map', auth);
  //               return true;
  //             })
  //           )

  // }


}

