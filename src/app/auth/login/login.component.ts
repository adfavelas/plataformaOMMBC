import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Form, FormGroup, FormControl, Validators } from '@angular/forms';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  error: String = null;
  location: Location;
  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigate(['home']);
    }
   }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required]
      }),
      password: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }
  login () {
    if (this.form.valid) {
      const body = {
        email: this.form.get('email').value,
        password: this.form.get('password').value
      };
      this.authService.login(body).subscribe(response => {
        if (response.message === 'success') {
          this.authService.setToken(response.token);
          this.router.navigate(['home']);
        } else {
          this.error = response.message;
        //   alert(response.message);
        }
      });
    }
  }
}
