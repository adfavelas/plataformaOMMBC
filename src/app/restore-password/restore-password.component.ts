import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.sass']
})
export class RestorePasswordComponent implements OnInit {
  email: String;
  constructor( public route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.email = this.authService.verifyToken(params.token);
      if (!this.email) {
        this.router.navigate(['login']);
      }
    });
  }

}
