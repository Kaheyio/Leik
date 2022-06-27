import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
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

  constructor(private authService: AuthService, private authGuardService: AuthGuardService, private router: Router) { }

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
        console.log(res);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  goToProtectedPage(){
    this.authGuardService.getTypeRequest('/').subscribe(res => {
      console.log(res);
      
      

      // if (res.status == 403) {
      //   // navigate to login page
      //   this.router.navigate(['/login']);
      // }
      

    })

  }

}
