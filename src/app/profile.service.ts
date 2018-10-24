import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({providedIn: 'root'})
export class ProfileService {

    constructor(private http: HttpClient ) {}


    getUserObject(email: string) {
        return this.http.get('http://localhost:8080/api/auth/user/' + email);
    }

}
