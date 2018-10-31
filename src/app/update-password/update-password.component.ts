import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.sass']
})
export class UpdatePasswordComponent implements OnInit {

    constructor(private profileService: ProfileService) { }

    ngOnInit() {
    }

    updatePassword(password: HTMLInputElement, confirmPassword: HTMLInputElement) {
        if (password.value === confirmPassword.value) {
            const body = {
                email: sessionStorage.getItem('email'),
                password: password.value
            };
            this.profileService.updatePassword(body).subscribe(res => {
                console.log(res);
            });
        }

    }

}
