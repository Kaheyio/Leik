import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.scss']
})
export class LoggedComponent implements OnInit {

  // get user data + new leikode after login
  userData: any
  userLeikode: any;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    // user data
    this.authService.userData.subscribe(data => {
      this.userData = data;
    });

    // leikode
    this.authService.userLeikode.subscribe(data => {
      this.userLeikode = data;
    });

  }


  logout() {
    // TODO: backend method in authservice to destroy cookie
    // this._auth.clearStorage()

    this.authService.getTypeRequest('/logout').subscribe({
      next: (res) => {
        console.log(Object.values(res)[0]);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


}
