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

  registerTeacher(body: Object) {
    console.log(body);
    return this.http.post<{ message: String, errorCode: Number}>(`${this.APIURL}/api/teachers/createTeacher`, body);
  }

  acceptTeacher(body: Object) {
    return this.http.put<{ messate: String, errorCode: Number }>(this.APIURL + '/api/teachers/acceptTeacher', body);
  }

  denyTeacher(body: Object) {
    return this.http.put<{ messate: String, errorCode: Number }>(this.APIURL + '/api/teachers/denyTeacher', body);
  }
}
