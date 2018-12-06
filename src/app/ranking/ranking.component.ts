import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.sass']
})
export class RankingComponent implements OnInit {
    students;
    constructor(private studentsService: StudentsService, private router: Router) { }

    ngOnInit() {
        this.studentsService.getUsers().subscribe(res => {
            console.log(res);
            if (res.errorCode === 0) {
                this.students = res.students;
            }
        });
    }

    viewUserProfile(studentId: String) {
        this.router.navigate([`profile/${studentId}`]);
    }
}
