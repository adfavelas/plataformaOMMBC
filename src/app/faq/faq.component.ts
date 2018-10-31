import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.sass']
})
export class FaqComponent implements OnInit {

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        if (!this.authService.isUserLoggedIn()) {
            this.router.navigate(['login']);
        }
        $(document).ready(function() {
            $('.collapsible').collapsible();
        });
    }

}
