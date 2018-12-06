import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class AuthService {
    APIURL = environment.APIURL;
    token;
    isAuth = new BehaviorSubject(sessionStorage.getItem('token'));
    isAuth$ = this.isAuth.asObservable();
    jwtHelper = new JwtHelperService();
    constructor(private http: HttpClient ) {}

    createUser(body: any) {
        return this.http.post<{ message: String, errorCode: Number}>(this.APIURL + '/api/auth/signup', body);
    }

    login(body: any) {
        return this.http.post<{ message: String, token: string, expresIn: String, userId: String}>(
            this.APIURL + '/api/auth/login', body
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
            // console.log(isExpired);
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
        this.isAuth.next(null);
    }

    forgotPassword(email: string) {
        return this.http.get<{message: String, errorCode: Number}>(this.APIURL + '/api/auth/sendRestoreEmail/' + email);
    }

    verifyToken(token) {
        try {
            const decoded = this.jwtHelper.decodeToken(token);
            if (decoded) {
                return decoded.email;
            }
        } catch {
            return undefined;
        }
    }
}
