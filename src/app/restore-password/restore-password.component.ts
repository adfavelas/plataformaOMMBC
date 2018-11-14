import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ProfileService } from '../profile.service';

declare var $: any;
declare var M: any;

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.sass']
})
export class RestorePasswordComponent implements OnInit {
  email: String;
  error: String = null;
  invalidPassword = true;
  uploading = false;
  serverResponse: String;
  constructor( public route: ActivatedRoute, private authService: AuthService,
               private router: Router, private profileService: ProfileService) { }

  ngOnInit() {
    $('.modal').modal({ dismissible: false });
    this.route.params.subscribe(params => {
      this.email = this.authService.verifyToken(params.token);
      console.log(this.email);
      if (!this.email) {
        this.router.navigate(['login']);
      }
    });
  }

  restorePassword(password: HTMLInputElement, confirmPassword: HTMLInputElement) {
    this.uploading = true;
    this.error = null;
    const modalInstance = M.Modal.getInstance($('#signUpModal'));
    modalInstance.open();

    if (password.value && password.value === confirmPassword.value) {
        const body = {
            email: this.email,
            password: password.value
        };
        this.profileService.restorePassword(body).subscribe(res => {
            this.uploading = false;
            this.serverResponse = res.message;

            if (res.errorCode === 0) {
                modalInstance.open();
            } else {
                modalInstance.open();
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    } else {
        this.uploading = false;
        this.error = 'Las contraseñas no coinciden o se encuentran vacías.';
    }
  }
  navigateToLogin() {
      this.router.navigate(['login']);
  }

}
