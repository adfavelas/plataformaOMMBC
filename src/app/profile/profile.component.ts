import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user;
  constructor(private profileService: ProfileService ) { }

  ngOnInit() {
    this.profileService.getUserObject(sessionStorage.getItem('email')).subscribe(user => {
      this.user = user;
      console.log(this.user);
    });
  }

}
