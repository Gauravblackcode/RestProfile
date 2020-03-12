import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import {  NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router} from '@angular/router';

interface TokenIterface {
  token: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  RegisterMode = false;

  constructor(

    private appService:AppService,
    private cookieService:CookieService,
    private router: Router,
  ) { }

  ngOnInit() {
    const mrToken = this.cookieService.get('mr-token');
    if (mrToken) {
      this.router.navigate(['/feed']);
    }

  }
  // start of login
    onLogin(form: NgForm){
      this.appService.loginUser(form.value).subscribe(
        (result: TokenIterface) => {
          this.cookieService.set('mr-token', result.token);
          this.router.navigate(['/feed']);
        },
        error => {
          console.log(error);
        }
      );

      }
// start of register
    onRegister(form: NgForm){
      this.appService.registerUser(form.value).subscribe(
        result => {
          console.log(result);
          // after register go to loginUser
          this.appService.loginUser(form.value).subscribe(
            (result: TokenIterface) => {
              this.cookieService.set('mr-token', result.token);
              this.router.navigate(['/feed']);
            },
            error => {
              console.log(error);
            }
          );
          // end of login
        },
        error => {
          console.log(error);
        }
      )
    }



}
