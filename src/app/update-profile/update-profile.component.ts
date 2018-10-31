import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare var $: any;
declare var M: any;

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.sass']
})
export class UpdateProfileComponent implements OnInit {
    profile;
    birthDate: String;
    form: FormGroup;

    student = {
        name: 'Jose',
        lastName: 'Rodriguez',
        schoolName: 'CETYS Universidad',
        state: 'Durango',
        city: 'Tijuana',
        birthDate: '20/10/2000',
        email: sessionStorage.getItem('email')
    };
    constructor(private profileService: ProfileService ) { }

    ngOnInit() {
        this.initForm();

        this.profileService.getUserObject(sessionStorage.getItem('email')).subscribe(res => {
            this.profile = res.student;
            console.log(this.profile);
        });

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
            $('.modal').modal();
            $('.tabs').tabs();

            $('label').addClass('active');
            $('.tabs .indicator').css('background-color', primaryColorLight);
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
            city: new FormControl(null , {
                validators: [Validators.required]
            }),
            state: new FormControl(null , {
                validators: [Validators.required]
            }),
            schoolName: new FormControl(null , {
                validators: [Validators.required]
            })
        });
    }

    setDate(birthDate: HTMLInputElement) {
        this.birthDate = birthDate.value;
    }

    submit() {
        // Call Service for Post on Node
        if (this.form.valid) {
            const updatedStudent = this.buildUserObject();

            this.profileService.updateStudent(updatedStudent).subscribe(res => {
                console.log(res);
            });
        } else {
            return;
        }
    }

    buildUserObject() {
        const body = {
            name : this.form.get('name').value,
            lastName: this.form.get('lastName').value,
            birthDate: this.birthDate,
            city: this.form.get('city').value,
            state: this.form.get('state').value,
            schoolName: this.form.get('schoolName').value
        };
        return body;
    }
}
