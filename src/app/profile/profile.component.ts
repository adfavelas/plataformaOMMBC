import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  student;
  constructor(private profileService: ProfileService ) { }

  ngOnInit() {
    this.profileService.getUserObject(sessionStorage.getItem('email')).subscribe(res => {
        this.student = res.student;
        console.log(this.student);
    });
  }

}
