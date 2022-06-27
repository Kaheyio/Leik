import { Component, OnInit } from '@angular/core';
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

  constructor(private authService: AuthService) { }

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


}
