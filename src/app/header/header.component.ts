import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  private isLoggedInSub: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isUserLoggedIn();
    this.authService.isAuth$.subscribe( res => {
      if ( res ) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

}
