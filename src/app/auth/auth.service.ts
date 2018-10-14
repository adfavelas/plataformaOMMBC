import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({providedIn: 'root'})
export class AuthService {
    private isAuthenticated = false;

    constructor(private http: HttpClient ) {}

    createUser(body: any) {
        return this.http.post<{ message: String, errorCode: Number}>('http://localhost:8080/api/auth/signup', body);
    }

    login(body: any) {
        return this.http.post<{ message: String, token: String, expresIn: String, userId: String}>(
            'http://localhost:8080/api/auth/login', body
        );
    }
}
