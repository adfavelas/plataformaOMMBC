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
  acceptTeacher(teacherEmail: string): void {
    const teacher = { email: teacherEmail };
    this.teacherService.acceptTeacher(teacher).subscribe(res => {

    });
  }
  declineTeacher(teacherEmail: string): void {
    const teacher = { email: teacherEmail };
    this.teacherService.denyTeacher(teacher).subscribe(res => {

    });
  }

}
