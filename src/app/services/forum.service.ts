import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private APIURL = environment.APIURL;
  constructor(private http: HttpClient) { }

  getForumQuestions() {
    return this.http.get<{ message: string, forumQuestions: Object, errorCode: number}>(this.APIURL + '/api/forum');
  }

  createForumQuestion(question: Object): any {
    return this.http.post<{ message: String, errorCode: Number }>(this.APIURL + '/api/forum/createForumQuestion', question);
  }

  createForumReply(reply: Object): any {
    return this.http.put<{ message: String, reply: Object, errorCode: Number }>(this.APIURL + '/api/forum/createReply', reply);
  }

  deleteForumReply(replyId: String): any {
    return this.http.delete<{ message: String, errorCode: Number }>(this.APIURL + '/api/forum/deleteReply/' + replyId);
  }
}
