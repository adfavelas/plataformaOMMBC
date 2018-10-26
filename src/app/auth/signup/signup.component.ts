import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

declare var $: any;
declare var M: any;

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

    // TO DO : implement messagesx
    birthDate: String;
    respuesta: String;
    form: FormGroup;
    constructor(private authService: AuthService, private router: Router) {
        if (this.authService.isUserLoggedIn()) {
          this.router.navigate(['home']);
        }
       }

    ngOnInit() {
        this.initForm();

        $(document).ready(function() {
            const options = {
                'format': 'dd/mm/yyyy'
            };
            $('.datepicker').datepicker(options);
            $('select').formSelect();
            $('.modal').modal();
        });
    }

    initForm() {
        this.form = new FormGroup({
            name: new FormControl(null, {
                validators: [Validators.required]
            }),
            lastName: new FormControl(null, {
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

    setDate(birthDate: HTMLInputElement) {
        this.birthDate = birthDate.value;
    }

  submit() {
    const modalInstance = M.Modal.getInstance($('#signUpModal'));
        // Call Service for Post on Node
        if ( this.form.valid && this.verifyFields() ) {
            const authData = this.buildUserObject();
            this.authService.createUser(authData).subscribe( res => {
            console.log(res);
                if ( res.message === 'Success' ) {
                    modalInstance.open();
                    this.respuesta = res.message;
                    if (!modalInstance.isOpen) {
                        this.router.navigate(['login']);
                    }
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
      lastName: this.form.get('lastName').value,
      birthDate: this.birthDate,
      email: this.form.get('email').value,
      city: this.form.get('city').value,
      state: this.form.get('state').value,
      schoolName: this.form.get('schoolName').value,
      password: this.form.get('password').value,
    };
    return body;
  }
}
