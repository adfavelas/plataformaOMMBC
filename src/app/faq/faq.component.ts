import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.sass']
})
export class FaqComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        $(document).ready(function() {
            $('.collapsible').collapsible();
        });
    }

}
