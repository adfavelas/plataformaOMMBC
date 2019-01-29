import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  APIURL = environment.APIURL;
  constructor(private http: HttpClient) { }

  uploadCSV(data: FormData) {
    return this.http.post<any>(`${this.APIURL}/ommbc/api/admin/upload`, data);
  }
}
