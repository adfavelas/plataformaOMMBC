import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  student;
  constructor(private profileService: ProfileService,  private router: Router, private authService: AuthService) {
   }

  ngOnInit() {
    this.profileService.getUserObject(sessionStorage.getItem('email')).subscribe(res => {
      if (res.errorCode === 3) {
        this.router.navigate(['login']);
        sessionStorage.removeItem('token');
      }
        this.student = res.student;
    });
  }

}
