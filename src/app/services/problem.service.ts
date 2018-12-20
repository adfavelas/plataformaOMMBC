import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { StudentsService } from './students.service';


@Injectable({providedIn: 'root'})
export class ProblemService {
    APIURL = environment.APIURL;
    constructor(private http: HttpClient ) {}

    getProblems(query: String | null) {
        if ( query) {
            return this.http.get<{message: String, problems: Object, errorCode: Number}>(this.APIURL + '/api/problems' + query);
        } else {
            return this.http.get<{message: String, problems: Object, errorCode: Number}>(this.APIURL + '/api/problems');
        }
    }

    getProblemById(id: String) {
        return this.http.get<{message: String, problem: Object, errorCode: Number}>(this.APIURL + '/api/problems/' + id);
    }

    submitProblem(body: Object) {
        return this.http.post<{message: String, errorCode: Number}>(this.APIURL + '/api/problems/submitProblem', body);
    }

    getPendingProblems(studentId: String) {
        return this.http.get<{ message: String, problems: Object, errorCode: Number }>(
            this.APIURL + '/api/problems/pendingProblems/' + studentId
            );
    }

    getCorrectProblems(studentId: String) {
        return this.http.get<{message: String, problems: Object, errorCode: Number}>(
            this.APIURL + '/api/problems/answeredProblems/' + studentId
            );
    }

    isProblemAnswered(problemId: String) {
        return this.http.get<{message: String, errorCode: Number, answer: Object|undefined}>(`${this.APIURL}/api/problems/problemAnswered/${problemId}`);
    }
}
