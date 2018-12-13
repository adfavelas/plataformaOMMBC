import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ProblemService } from '../services/problem.service';
import { StudentsService } from '../services/students.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
    student;
    pendingProblems;
    correctProblems;

    constructor(private profileService: ProfileService,  private router: Router, private studentService: StudentsService,
        private activatedRoute: ActivatedRoute, private problemService: ProblemService) {}

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe( (paramMap: ParamMap) => {
            const id = paramMap.get('id');
            if (id) {
                this.studentService.getStudentById(id).subscribe( res => {
                    if (res.errorCode === 1) {
                        this.router.navigate(['404']);
                    }
                    this.student = res.student;
                    if (this.student) {
                        this.problemService.getPendingProblems(this.student._id).subscribe(pendingProblemsResponse => {
                            if (pendingProblemsResponse.errorCode === 0) {
                                this.pendingProblems = pendingProblemsResponse.problems;
                            }
                        });
                        this.problemService.getCorrectProblems(this.student._id).subscribe(correctProblemsResponse => {
                            if (correctProblemsResponse.errorCode === 0) {
                                this.correctProblems = correctProblemsResponse.problems;
                            }
                        });
                    }
                });
            } else {
                this.profileService.getUserObject().subscribe(res => {
                    if (res.errorCode === 3) {
                        this.router.navigate(['login']);
                        sessionStorage.removeItem('token');
                    }
                    this.student = res.student;
                    this.problemService.getPendingProblems(this.student._id).subscribe(pendingProblemsResponse => {
                        if (pendingProblemsResponse.errorCode === 0) {
                            this.pendingProblems = pendingProblemsResponse.problems;
                        }
                    });
                    this.problemService.getCorrectProblems(this.student._id).subscribe(correctProblemsResponse => {
                        if (correctProblemsResponse.errorCode === 0) {
                            this.correctProblems = correctProblemsResponse.problems;
                        }
                    });
                });
            }
        });
    }

}
