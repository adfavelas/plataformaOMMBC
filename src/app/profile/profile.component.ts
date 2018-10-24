import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUserObject(sessionStorage.getItem('email')).subscribe(user => {
      this.user = user;
      console.log(this.user);
    });
  }

}
