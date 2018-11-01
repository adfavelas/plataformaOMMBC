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
    selectedCountry: String;
    mexican = true;
    birthDate: String;
    serverResponse: String;
    form: FormGroup;
    uploading = false;
    error: String = null;

    constructor(private authService: AuthService, private router: Router) {
        if (this.authService.isUserLoggedIn()) {
          this.router.navigate(['home']);
        }
    }

    ngOnInit() {
        this.initForm();

        $(document).ready(function() {
            const primaryColorLight = '#0767A4';
            const secondaryColor = '#0693BE';

            const datePickerOptions = {
                onDraw: () => {
                    $('.dropdown-content li>a, .dropdown-content li>span').css('color', secondaryColor);
                    $('.datepicker-date-display').css('background-color', primaryColorLight);
                    $('.datepicker-calendar-container .datepicker-footer .confirmation-btns > button').css('color', secondaryColor);
                    $('.datepicker-table td.is-selected').css('background-color', primaryColorLight);
                },
                format: 'dd/mm/yyyy',
                defaultDate: new Date(2006, 11, 31),
                minDate: new Date(1900, 0, 1),
                maxDate: new Date(2006, 11, 31),
                i18n: {
                    cancel: 'Cancelar',
                    done: 'Aceptar',
                    months: [
                        'Enero',
                        'Febrero',
                        'Marzo',
                        'Abril',
                        'Mayo',
                        'Junio',
                        'Julio',
                        'Agosto',
                        'Septiembre',
                        'Octubre',
                        'Noviembre',
                        'Diciembre'
                    ],
                    monthsShort: [
                        'Ene',
                        'Feb',
                        'Mar',
                        'Abr',
                        'Mayo',
                        'Jun',
                        'Jul',
                        'Ago',
                        'Sep',
                        'Oct',
                        'Nov',
                        'Dic'
                    ],
                    weekdays: [
                        'Domingo',
                        'Lunes',
                        'Martes',
                        'Miércoles',
                        'Jueves',
                        'Viernes',
                        'Sábado'
                    ],
                    weekdaysShort: [
                        'Dom',
                        'Lun',
                        'Mar',
                        'Mie',
                        'Jue',
                        'Vie',
                        'Sab'
                    ],
                    weekdaysAbbrev: ['D', 'L', 'M', 'Mi', 'J', 'V', 'S']
                }
            };
            $('.datepicker').datepicker(datePickerOptions);
            $('select').formSelect();
            $('.modal').modal({ dismissible: false });

            $('.dropdown-content li:not(.disabled) > a, .dropdown-content li:not(.disabled) > span').css('color', secondaryColor);
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
            country: new FormControl(null , {
                validators: [Validators.required]
            }),
            state: new FormControl(null),
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

    setCountry(event: Event) {
        const value = event + '';
        if (value === 'México') {
            this.mexican = false;
        }
    }

    submit() {
        this.error = null;
        const modalInstance = M.Modal.getInstance($('#signUpModal'));
        // this.uploading = true;
        // modalInstance.open();
        // Call Service for Post on Node
        if ( this.form.valid && this.verifyFields() ) {
            this.uploading = true;
            modalInstance.open();
            const authData = this.buildUserObject();
            this.authService.createUser(authData).subscribe( res => {
                this.serverResponse = res.message;
                console.log(res);
                if ( res.errorCode === 0 ) {
                    this.uploading = false;
                    modalInstance.open();
                } else {
                    this.form.reset();
                    this.birthDate = '';
                    this.uploading = false;
                    modalInstance.open();
                }
            }, err => {
                console.log(err);
            });
        } else {
            this.error = 'Verifica que todos los campos estén correctamente llenos.';
            // this.uploading = false;
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

    navigateToLogin() {
        this.router.navigate(['login']);
    }
}
