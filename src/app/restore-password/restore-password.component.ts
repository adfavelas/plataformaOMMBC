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
  notMatch = false;
  constructor(
    public route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private profileService: ProfileService
  ) {}

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

  restorePassword(
    password: HTMLInputElement,
    confirmPassword: HTMLInputElement
  ) {
    console.log(password.value);
    console.log(confirmPassword.value);
    if (password.value && password.value === confirmPassword.value) {
      const body = {
        email: this.email,
        password: password.value
      };

      console.log(body);
      this.profileService.restorePassword(body).subscribe(
        res => {
          console.log(res);
          this.uploading = false;
          this.serverResponse = res.message;
          console.log(this.serverResponse);
          if (res.errorCode === 0) {
            this.uploading = true;
            this.error = null;
            const modalInstance = M.Modal.getInstance($('#signUpModal'));
            modalInstance.open();
          } else if (res.errorCode === 2) {
            this.error = res.message;
            const modalInstance = M.Modal.getInstance($('#signUpModal'));
            modalInstance.open();
          } else {
            this.error = res.message;
            const modalInstance = M.Modal.getInstance($('#signUpModal'));
            modalInstance.open();
          }
        },
        err => {
          if (err) {
            console.log(err);
          }
        }
      );
    } else {
      this.uploading = false;
      this.notMatch = true;
      this.error = 'Las contraseñas no coinciden o se encuentran vacías.';
    }
  }
  navigateToLogin() {
    this.router.navigate(['login']);
  }
}
