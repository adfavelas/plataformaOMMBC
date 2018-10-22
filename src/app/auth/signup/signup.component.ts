import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import $ from 'jquery';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.initForm();
    // document.addEventListener('DOMContentLoaded', function() {
    //    const elems = document.querySelectorAll('.datepicker');
    //    const options = {
    //        'format': 'mmm dd, yyyy'
    //    };
    //    const instances = M.Datepicker.init(elems, options);
    // });
  }

  initForm() {
    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required]
      }),
      firstLastName: new FormControl(null, {
        validators: [Validators.required]
      }),
      secondLastName: new FormControl(null , {
        validators: [Validators.required]
      }),
      birthDate: new FormControl(null , {
        validators: [Validators.required]
      }),
      email: new FormControl(null , {
        validators: [Validators.required]
      }),
      city: new FormControl(null , {
        validators: [Validators.required]
      }),
      state: new FormControl(null , {
        validators: [Validators.required]
      }),
      schoolName: new FormControl(null , {
        validators: [Validators.required]
      }),
      password: new FormControl(null , {
        validators: [Validators.required]
      }),
      confirm_password: new FormControl(null , {
        validators: [Validators.required]
      })
    });
  }

  submit() {
    // Call Service for Post on Node
    if ( this.form.valid && this.verifyFields() ) {
      const authData = this.buildUserObject();
      this.authService.createUser(authData).subscribe( res => {
        console.log(res);
        if ( res.message === 'success' ) {
          this.router.navigate(['']);
        } else {
          alert(res.message);
          this.form.reset();
        }
      }, err => {
        console.log(err);
      });
    } else {
      return;
    }
  }

  verifyFields() {
    if (this.form.get('password').value !== this.form.get('confirm_password').value ) {
      return false;
    } else {
      return true;
    }
  }

  buildUserObject() {
    const body = {
      name : this.form.get('name').value,
      firstLastName: this.form.get('firstLastName').value,
      secondLastName: this.form.get('secondLastName').value,
      birthDate: this.form.get('birthDate').value,
      email: this.form.get('email').value,
      city: this.form.get('city').value,
      state: this.form.get('state').value,
      schoolName: this.form.get('schoolName').value,
      password: this.form.get('password').value,
    };
    return body;
  }
}
