import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CrudService } from './crud.service';
import { DataService } from './data.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  private $isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.$isLoggedIn.asObservable();

  private $isLoggedOut = new BehaviorSubject<boolean>(false);
  isLoggedOut = this.$isLoggedOut.asObservable();

  constructor(
    private crudService: CrudService,
    private dataService: DataService
  ) {

    // check that session storage is not empty and token is valid ( = logged components are protected)

    this.crudService.getTypeRequest('/auth/protected/logged').subscribe(res => {


      // TODO: PB = you have to reload the page for it to work + if you duplicate tab session storage is ok ?
      // if status = false, not allowed
      let accessAuthorized = Object.values(res)[0];
      // console.log('Status of authorization: ' + accessAuthorized);


      // 1) if session storage is empty, also make token invalid and log user out
      if (!sessionStorage.getItem('leikaUID') || !sessionStorage.getItem('leikaULK')) {
        this.crudService.getTypeRequest('/auth/logout').subscribe({
          next: (res) => {
            // cookie is cleared
            console.log(Object.values(res)[0]);

            this.setLoggedInState(false);
            this.setLoggedOutState(true);
          },
          error: (err) => {
            console.log(err);
          }
        });

        // clear session storage just in case
        this.dataService.clearSessionStorage();
      }

      // 2) if cookie is invalid, also clear session storage and log user out
      if (accessAuthorized !== true) {
        // clear session storage from userid and leikode
        this.dataService.clearSessionStorage();

        this.setLoggedInState(false);
        this.setLoggedOutState(true);

      }

      // IF EVERYTHING IS OK
      this.setLoggedInState(true);
      this.setLoggedOutState(false);

    });

  }


  // FOR TESTS
  getLoggedIn(){
    return this.isLoggedIn;
  }

  getLoggedOut(){
    return this.isLoggedOut;
  }

  // SETTERS FOR LOGGED STATE
  setLoggedInState(loggedState: any) {
    this.$isLoggedIn.next(loggedState);
  }

  setLoggedOutState(loggedState: any) {
    this.$isLoggedOut.next(loggedState);
  }

}
