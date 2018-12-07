import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { FaqService } from '../faq.service';

declare var $: any;

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.sass']
})
export class FaqComponent implements OnInit {
    questions;

    constructor(private authService: AuthService, 
                private faqService: FaqService,
                private router: Router) { }

    ngOnInit() {
        if (!this.authService.isUserLoggedIn()) {
            this.router.navigate(['login']);
        }
        this.faqService.getFaqQuestions().subscribe(res => {
            if (res.errorCode === 0) {
                this.questions = res.questions;
            }
        });
        $(document).ready(function() {
            $('.collapsible').collapsible();
        });
    }

}
