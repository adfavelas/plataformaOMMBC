import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private APIURL = environment.APIURL;
  constructor(private http: HttpClient) { }

  getForumQuesiions() {
    return this.http.get<{ message: string, forumQuestions: Object, errorCode: number}>(this.APIURL + '/api/forum');
  }

  // createForumDummy() {
  //   return this.http.get<{ message: string, forumQuestions: Object, errorCode: number}>(this.APIURL + '/api/forum/create');
  // }
}
