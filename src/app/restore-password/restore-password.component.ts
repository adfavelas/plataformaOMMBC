import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.sass']
})
export class RestorePasswordComponent implements OnInit {
  email: string;
  constructor() { }

  ngOnInit() {
  }

  setEmail() {
    console.log('email.value');
    // this.email = email;
  }

}
