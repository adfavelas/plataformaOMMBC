import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ProblemService } from '../problem.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
    student;
    pendingProblems;
    correctProblems;

    constructor(private profileService: ProfileService,  private router: Router, private authService: AuthService, private problemService: ProblemService) {
    }

    ngOnInit() {
        this.profileService.getUserObject(sessionStorage.getItem('email')).subscribe(res => {
            if (res.errorCode === 3) {
                this.router.navigate(['login']);
                sessionStorage.removeItem('token');
            }
            this.student = res.student;
            // this.problemService.getPendingProblems(this.student._id).subscribe(res => {
            //     if (res.errorCode === 0) {
            //         this.pendingProblems = res.problems;
            //         console.log('Pending -> ' + res.problems);
            //     }
            // });

            this.problemService.getCorrectProblems(this.student._id).subscribe(res => {
                if (res.errorCode === 0) {
                    this.correctProblems = res.problems;
                    console.log('Correct -> ' + res.problems);
                }
            });
        });
    }

}
