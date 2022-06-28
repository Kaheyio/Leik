import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.scss']
})
export class LoggedComponent implements OnInit {

  // get user data + new leikode after login
  userData: any;
  userLeikode: any;


  constructor(private authService: AuthService, private router: Router, public apiService: ApiService) { }

  ngOnInit(): void {

    // user data
    this.apiService.userData.subscribe(data => {      
      this.userData = data;
      console.log(this.userData);
    });

    // leikode
    this.apiService.userLeikode.subscribe(data => {
      this.userLeikode = data;
      console.log(this.userLeikode);
    });

    // TODO: test with data in session storage
    // log out if this.$isLoggedIn is false
    // if (!this.apiService.isLoggedIn) {
    //   this.logout();
    // }

  }

// TODO: create 3 log out conditions depending on click, session storage and protection cookie's expiration
  logout() {

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
