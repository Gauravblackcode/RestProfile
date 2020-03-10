import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontapp';
  posts = [];

  constructor(private appService:AppService){}
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
}
