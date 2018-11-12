import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.sass']
})
export class RankingComponent implements OnInit {
    students;
    constructor(private studentsService: StudentsService) { }

    ngOnInit() {
        this.studentsService.getUsers().subscribe(res => {
            if (res.errorCode === 0) {
                this.students = res.students;
            }
        });
    }

}
