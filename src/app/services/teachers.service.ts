import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {
  APIURL = environment.APIURL;
  constructor(private http: HttpClient ) {}

  getPendingTeachers() {
    return this.http.get<{ message: String, teachers: Object, errorCode: Number }>(this.APIURL + '/api/teachers/getPendingTeachers');
  }
}
