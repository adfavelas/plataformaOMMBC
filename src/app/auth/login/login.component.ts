import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required]
      }),
      password: new FormControl(null , {
        validators: [Validators.required]
      })
    });
  }

  login() {
    if ( this.form.valid ) {
      const body = {
        email: this.form.get('email').value,
        password: this.form.get('password').value
      };
      this.authService.login(body).subscribe( res => {
        console.log(res);
      }, err => {
        if ( err.status === 401) { alert('User Already Exists or not Found'); }
        console.log(err);
      });
    }  else {
      return;
    }
  }
}
