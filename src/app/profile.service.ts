import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';


@Injectable({providedIn: 'root'})
export class ProfileService {
    APIURL = environment.APIURL;
    constructor(private http: HttpClient ) {}


    getUserObject() {
        return this.http.get<{student: Object, errorCode: number}>(this.APIURL + '/api/auth/profile');
    }

    updateStudent(body: Object) {
        return this.http.put<{message: String, errorCode: Number}>(this.APIURL + '/api/auth/update', body);
    }

    updatePassword(body: Object) {
        return this.http.put<{message: String, errorCode: Number}>(this.APIURL + '/api/auth/changePassword', body);
    }

    restorePassword(body: Object) {
        return this.http.put<{message: String, errorCode: Number}>(this.APIURL + '/api/auth/changePasswordFromRestore', body);
    }

}
