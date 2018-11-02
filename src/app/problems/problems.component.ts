import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.sass']
})
export class ProblemsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function() {
        const primaryColorLight = '#0767A4';
        const secondaryColor = '#0693BE';

        $('select').formSelect();
        $('.dropdown-content li:not(.disabled) > a, .dropdown-content li:not(.disabled) > span').css('color', secondaryColor);
    });
  }

}
