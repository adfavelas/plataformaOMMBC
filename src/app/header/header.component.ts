import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  private isLoggedInSub: Subscription;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    console.log(this.router.url);
    this.isLoggedIn = this.authService.isUserLoggedIn();
    this.authService.isAuth$.subscribe( res => {
      if ( res  && res !== null) {
        this.isLoggedIn = true;
        $(document).ready(function() {
          $('.dropdown-trigger').dropdown();
      });
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

}
