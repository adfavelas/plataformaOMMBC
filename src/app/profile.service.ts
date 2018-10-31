import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({providedIn: 'root'})
export class ProfileService {

    constructor(private http: HttpClient ) {}


    getUserObject(email: string) {
        return this.http.get<{student: Object, errorCode: number}>('http://localhost:8080/api/auth/profile/' + email);
    }

    updateStudent(body: Object) {
        return this.http.put<{message: String, errorCode: Number}>('http://localhost:8080/api/auth/update', body);
    }

    updatePassword(body: Object) {
        return this.http.put<{message: String, errorCode: Number}>('http://localhost:8080/api/auth/changePassword', body);
    }

}
