import { Component, OnInit } from '@angular/core';
import $ from 'jquery';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function() {
        $('#selectedTest').formSelect();
    });
    //   this.initJquery();
  }

//   initJquery() {
    
//   }

}
