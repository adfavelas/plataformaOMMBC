import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FaqService {
  private APIURL = environment.APIURL;

  constructor(private http: HttpClient) { }

  getFaqQuestions() {
    return this.http.get<{ message: string, questions: object, errorCode: number }>(this.APIURL + '/api/faq');
  }


}
