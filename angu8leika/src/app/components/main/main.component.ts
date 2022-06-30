import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  loggedInState: boolean = false;
  loggedOutState: boolean = false;

  loggedState: boolean = false;

  constructor(private authGuardService: AuthGuardService) { }

  ngOnInit(): void {
    // TODO: for test
    // this.loggedInState = true;
    this.getLoggedState();
  }

  // TODO: get logged state from login component via auth guard service
  getLoggedState() {

    this.authGuardService.isLoggedIn.subscribe(res => {
      this.loggedInState = res;
      console.log('logged in ' + res + this.loggedInState);
    });

    this.authGuardService.isLoggedOut.subscribe(res => {
      this.loggedOutState = res;
      console.log('logged out ' + res + this.loggedOutState);
    })

    // this.authGuardService.loggedState.subscribe( res => {
    //   this.loggedState = res;
    //  console.log(res, this.loggedState);

    // })

  }


}
