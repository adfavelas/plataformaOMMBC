import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TeachersService } from 'src/app/services/teachers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.sass']
})
export class RequestsComponent implements OnInit {
  teachers;
  constructor(private authService: AuthService,
              private teacherService: TeachersService,
              private router: Router) { }

  ngOnInit() {
    this.teacherService.getPendingTeachers().subscribe(res => {
      console.log(res);
      if (res.errorCode === 0) {
        this.teachers = res.teachers;
      } else {
        this.router.navigate(['']);
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
