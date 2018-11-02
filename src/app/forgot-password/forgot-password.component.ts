import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

declare var $: any;
declare var M: any;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.sass']
})
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup;
  serverResponse: String;
  uploading = false;
  errorCode;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // console.log(routeParams)
    this.initForm();
  }


  initForm() {
    $('.modal').modal({ dismissible: false });
    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  submit() {
    const modalInstance = M.Modal.getInstance($('#signUpModal'));
    // console.log(this.form);
    this.uploading = true;
    console.log(modalInstance);
    modalInstance.open();
    if (this.form.valid) {
      const email = this.form.get('email').value;
      this.authService.forgotPassword(email).subscribe( res => {
        console.log(res);
        this.serverResponse = res.message;
        this.errorCode = res.errorCode;
        if ( res.errorCode === 0 ) {
          this.uploading = false;
          modalInstance.open();
      } else {
          this.uploading = false;
          modalInstance.open();
      }
      });
    }
  }

  navigateToLogin() {
    if (this.errorCode === 0) {
      this.router.navigate(['login']);
    }
    this.form.reset();
}

}
