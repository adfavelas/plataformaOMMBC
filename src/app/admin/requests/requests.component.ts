import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.sass']
})
export class RequestsComponent implements OnInit {
  teachers;
  constructor(private authService: AuthService,
              private teacherService: TeachersService) { }

  ngOnInit() {
    this.teacherService.getPendingTeachers().subscribe(res => {
      console.log(res);
      if (res.errorCode === 0) {
        this.teachers = res.teachers;
      }
    });
  }
  acceptTeacher(teacherId: string): void {
    console.log(teacherId);
  }
  declineTeacher(teacherId: string): void {
    console.log(teacherId);
  }

}
