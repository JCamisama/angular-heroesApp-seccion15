import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Auth } from '../../../auth/interfaces/auth.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    .container {
      margin: 10px
    }
  `]
})
export class HomeComponent implements OnInit {

  // public auth!: Auth; //undefined



  constructor(private _router: Router,
              private _authService: AuthService) { }

  ngOnInit(): void {
  }

  get auth(): Auth{
    return this._authService.auth;
  }

  public logout(): void {
    this._router.navigate(['./auth']);
    this._authService.logout();
  }

}
