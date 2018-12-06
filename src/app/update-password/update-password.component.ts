import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

declare var $: any;
declare var M: any;

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.sass']
})
export class UpdatePasswordComponent implements OnInit {
    error: String = null;
    uploading = false;
    serverResponse: String;

    constructor(private profileService: ProfileService, private router: Router, private authService: AuthService) {}

    ngOnInit() {
        if (!this.authService.isUserLoggedIn()) {
            this.router.navigate(['login']);
        }
    }

    updatePassword(password: HTMLInputElement, confirmPassword: HTMLInputElement) {
        this.uploading = true;
        this.error = null;
        const modalInstance = M.Modal.getInstance($('#signUpModal'));
        modalInstance.open();

        if (password.value === confirmPassword.value) {
            const body = {
                password: password.value
            };
            this.profileService.updatePassword(body).subscribe(res => {
                this.uploading = false;
                this.serverResponse = res.message;

                if (res.errorCode === 0 ) {
                    modalInstance.open();
                } else {
                    this.error = res.message;
                }
            });
        } else {
            this.error = 'Las contraseñas no coinciden.';
        }

    }

    navigateToLogin() {
        this.router.navigate(['login']);
    }

}
