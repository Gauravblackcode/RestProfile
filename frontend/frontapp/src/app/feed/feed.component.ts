import { Component, OnInit, Input} from '@angular/core';
import { AppService } from '../app.service';
import {  NgForm } from '@angular/forms';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  posts = [];

  constructor(private appService:AppService) { }

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
  onPost(form: NgForm){
    this.appService.FeedPost(form.value).subscribe(
      result => {
        console.log('component func working', result);
        this.posts.push(result);
      }
    )

  }
}
