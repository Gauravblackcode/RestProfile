import { Component } from '@angular/core';
import { AppService } from './app.service';
import { CookieService } from 'ngx-cookie-service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontapp';
  posts:any = [];

  constructor(
    private appService:AppService,
    private cookieService:CookieService,
    private router: Router,
  ) {}
  ngOnInit() {

    this.appService.getPosts().subscribe(
      data => {
        console.log('this is data' ,data);
        this.posts = data;
      },
      error => {
        console.log(error);
      }
    )
  }
  logout() {
    this.cookieService.delete('mr-token');
    this.router.navigate(['login'])
  }
}
