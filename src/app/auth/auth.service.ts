import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({providedIn: 'root'})
export class AuthService {
    token;
    isAuth = new BehaviorSubject(sessionStorage.getItem('token'));
    isAuth$ = this.isAuth.asObservable();
    jwtHelper = new JwtHelperService();
    constructor(private http: HttpClient ) {}

    createUser(body: any) {
        return this.http.post<{ message: String, errorCode: Number}>('http://localhost:8080/api/auth/signup', body);
    }

    login(body: any) {
        return this.http.post<{ message: String, token: string, expresIn: String, userId: String}>(
            'http://localhost:8080/api/auth/login', body
        );
    }

    setToken(token: string) {
        this.token = token;
        this.isAuth.next(token);
        sessionStorage.setItem('token', token);
    }

    isUserLoggedIn() {
        const token  = sessionStorage.getItem('token');
        if (token) {
            const isExpired = this.jwtHelper.isTokenExpired(token);
            console.log(isExpired);
            if (!isExpired) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    getToken() {
        return sessionStorage.getItem('token');
    }

    logout() {
        sessionStorage.removeItem('token');
        this.isAuth.next(this.token);
    }
}
