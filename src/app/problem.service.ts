import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';


@Injectable({providedIn: 'root'})
export class ProfileService {
    APIURL = environment.APIURL;
    constructor(private http: HttpClient ) {}

    getProblems() {
        return this.http.get<{message: String, problems: Object, errorCode: Number}>(this.APIURL + '/api/problems');
    }
}
