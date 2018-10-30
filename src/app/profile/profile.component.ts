import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  profile;
  constructor(private profileService: ProfileService ) { }

  ngOnInit() {
    this.profileService.getUserObject(sessionStorage.getItem('email')).subscribe(res => {
        this.profile = res.profile;
        console.log(this.profile);
    });
  }

}
