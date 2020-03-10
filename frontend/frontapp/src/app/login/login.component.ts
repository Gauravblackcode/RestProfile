import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import {  NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  RegisterMode = false;

  constructor(private appService:AppService) { }

  ngOnInit() {

  }
  onLogin(form: NgForm){
    if (!this.RegisterMode){
      this.appService.loginUser(form.value).subscribe(
        result => {
          console.log(result);
        },
        error => {
          console.log(error);
        }
      );
    }else {
      this.appService.registerUser(form.value).subscribe(
        result => {
          console.log(result);
        },
        error => {
          console.log(error);
        }
      )
    }
  }

}
