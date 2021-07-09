import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent  {

  constructor(
    private _router      : Router,
    private _authService : AuthService
    ) { }

  public login(): void {

    // Ir al back-end
    // Un usuario
    this._authService.login()
      .subscribe( reply => {
        console.log(reply);
      });

    this._router.navigate(['./heroes']);
  }


  public goInWithoutLogin():void {
    this._authService.logout();
    this._router.navigate(['./heroes']);
  }

}
