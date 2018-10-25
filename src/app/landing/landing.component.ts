import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.sass']
})
export class LandingComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigate(['home']);
    }
   }

  ngOnInit() {
  }

}
