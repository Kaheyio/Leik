import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { CrudService } from './crud.service';
import { DataService } from './data.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {


  private $loggedState = new BehaviorSubject<boolean>(false);
  loggedState = this.$loggedState.asObservable();

  private $isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.$isLoggedIn.asObservable();

  private $isLoggedOut = new BehaviorSubject<boolean>(false);
  isLoggedOut = this.$isLoggedOut.asObservable();

  constructor(
    private router: Router,
    private crudService: CrudService,
    private dataService: DataService
  ) {

    // if user is logged in, check that session storage is not empty and token is valid
    if (this.isLoggedOut) {

      console.log(this.isLoggedOut);

      this.crudService.getTypeRequest('/auth/protected/logged').subscribe(res => {


        // TODO: PB = you have to reload the page for it to work + if you duplicate tab session storage is ok ?
        // if status = false, not allowed
        let accessAuthorized = Object.values(res)[0];
        // console.log('Status of authorization: ' + accessAuthorized);


        // if session storage is empty make token invalid and logout
        if (!sessionStorage.getItem('leikaUID') || !sessionStorage.getItem('leikaULK')) {
          this.crudService.getTypeRequest('/auth/logout').subscribe({
            next: (res) => {
              console.log(Object.values(res)[0]);


              // TODO: test boolean in main = login or logged
              /* if we were able to get user data using id from session storage AND authToken cookie is valid, user is logged in (can access logged components and its children) */
              this.$isLoggedIn.next(false);
              this.$isLoggedOut.next(true);
            },
            error: (err) => {
              console.log(err);
            }
          });

          // clear session storage just in case
          this.dataService.clearSessionStorage();
        }

        if (accessAuthorized !== true) {
          // clear session storage from userid and leikode
          this.dataService.clearSessionStorage();

          // this.router.navigate(['/login']);
          this.$isLoggedIn.next(false);
          this.$isLoggedOut.next(true);

        }

        // IF EVERYTHING IS OK
        // return true;
        // this.$isLoggedIn.next(true);
        // this.$isLoggedOut.next(false);

      });

      // this.$isLoggedIn.next(true);
      // this.$isLoggedOut.next(false);

    }

    // this.$isLoggedIn.next(true);
    // this.$isLoggedOut.next(false);











    // this.crudService.getTypeRequest('/auth/protected/logged').subscribe(res => {

    //   // TODO: PB = you have to reload the page for it to work + if you duplicate tab session storage is ok ?
    //   // if status = false, not allowed
    //   let accessAuthorized = Object.values(res)[0];
    //   // console.log('Status of authorization: ' + accessAuthorized);

    //   // if session storage is empty make token invalid and logout
    //   if (!sessionStorage.getItem('leikaUID') || !sessionStorage.getItem('leikaULK')) {
    //     this.crudService.getTypeRequest('/auth/logout').subscribe({
    //       next: (res) => {
    //         console.log(Object.values(res)[0]);

    //         // this.router.navigate(['/login']);

    //         // TODO: test isLoggedIn boolean in main = login or logged
    //         /* if we were able to get user data using id from session storage AND authToken cookie is valid, user is logged in (can access logged components and its children) */

    //         this.$isLoggedIn.next(false);
    //       },
    //       error: (err) => {
    //         console.log(err);
    //       }
    //     });

    //     // clear session storage just in case
    //     this.dataService.clearSessionStorage();
    //   }

    //   if (accessAuthorized !== true) {
    //     // clear session storage from userid and leikode
    //     this.dataService.clearSessionStorage();

    //     // this.router.navigate(['/login']);
    //     this.$isLoggedIn.next(false);

    //   }

    //   // return true;
    //   this.$isLoggedIn.next(true);

    // })

    // // return true;
    // // this.$isLoggedIn.next(true);

  }


  // canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {



  // }

  // SETTERS FOR LOGGED STATE
  setLoggedInState(loggedState: any) {
    this.$isLoggedIn.next(loggedState);
  }

  setLoggedOutState(loggedState: any) {
    this.$isLoggedOut.next(loggedState);
  }

  // check state
  checkLoggedState() {

  }

}
