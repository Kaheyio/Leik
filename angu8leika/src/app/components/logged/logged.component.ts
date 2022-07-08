import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { CrudService } from 'src/app/services/crud.service';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.scss']
})
export class LoggedComponent implements OnInit {

  userData: any;
  userLeikode: any;

  // booleans for logged state
  loggedInState: boolean = false;
  loggedOutState: boolean = false;


  constructor(private crudService: CrudService, private authGuardService: AuthGuardService, public dataService: DataService) { }

  ngOnInit(): void {

    this.getUserData();

  }


  getUserData() {
    // get user data from data service     
    this.dataService.getLoggedUserData().subscribe(data => {
      // console.log(data);
      this.userData = data;
    });

    // get user leikode from data service (from session storage since it's not hashed)
    this.dataService.getLoggedUserLeikode().subscribe(data => {
      // console.log(data);
      this.userLeikode = data;
    });
  }


  // log out on click 
  logout() {

    // clear authToken from cookie storage
    this.crudService.getTypeRequest('/auth/logout').subscribe({
      next: (res) => {
        console.log(Object.values(res)[0]);

        //TODO: change logged state instead of redirection
        this.loggedOutState = true;
        this.loggedInState = false;

        // send states to auth guard service so that it can send them to main component
        this.authGuardService.setLoggedOutState(this.loggedOutState);
        this.authGuardService.setLoggedInState(this.loggedInState);

        // clear userdata and leikode on logout
        this.dataService.clearUserData();

        // clear session storage
        this.dataService.clearSessionStorage();

      },
      error: (err) => {
        console.log(err);
      }
    });


  }



}
