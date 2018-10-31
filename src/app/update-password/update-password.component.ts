import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.sass']
})
export class UpdatePasswordComponent implements OnInit {

    constructor(private profileService: ProfileService, private router: Router, private authService: AuthService) {}

    ngOnInit() {
        if (!this.authService.isUserLoggedIn()) {
            this.router.navigate(['login']);
        }
    }

    updatePassword(password: HTMLInputElement, confirmPassword: HTMLInputElement) {
        if (password.value === confirmPassword.value) {
            const body = {
                email: sessionStorage.getItem('email'),
                password: password.value
            };
            this.profileService.updatePassword(body).subscribe(res => {
                console.log(res);
                if (res.errorCode === 0 ) {
                    this.router.navigate(['home']);
                }
            });
        }

    }

}
