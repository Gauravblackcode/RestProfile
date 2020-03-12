import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AppService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    // Authorization: 'Token eb101304cedb2eddcda6eb0cec5d58319c7c5e5f'
  });

  constructor(private http:HttpClient) { }

  getPosts(){
    return this.http.get('http://127.0.0.1:8000/api/feed/');
  }
  loginUser(authdata){
    const body = JSON.stringify(authdata);
    console.log('login service aftr JSON stringify working', body);
    return this.http.post('http://127.0.0.1:8000/api/login', body, {headers: this.headers})

  }
  registerUser(authdata){
    const body = JSON.stringify(authdata);
    console.log('serive aftr JSON stringify working',body);
    return this.http.post('http://127.0.0.1:8000/api/profile/', body, {headers: this.headers})

  }

  FeedPost(feedData){
    const body = JSON.stringify(feedData);
    console.log('serive feed  aftr JSON stringify working', body);
    return this.http.post('http://127.0.0.1:8000/api/feed/', body, {headers: this.headers})

  }
}
