import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {

    if (!this.authService.isUserLoggedIn()) {
      this.router.navigate(['login']);
    }
   }

  ngOnInit() {
  }

}
