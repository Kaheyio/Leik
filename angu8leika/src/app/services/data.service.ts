import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // to get data from session storage (that was put there on login)
  userId: any;
  userLeikode: any;

  // to check authToken = in cookie storage + valid
  authTokenValid: any;

  // BehaviorSubject (to share logged user data within the app)
  // user data
  private $userData = new BehaviorSubject<any>('');
  userData = this.$userData.asObservable();

  // isLoggedIn = true if user data in session storage and authtoken in cookie storage
  private $isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.$isLoggedIn.asObservable();


  constructor(private crudService: CrudService) {
    // TODO: get rid of this log
    console.log('DataService created');


    /* get user id and leikode that were put in session storage on login
     [NB: to keep data displayed if page is refreshed] */
    if (sessionStorage.getItem('leikaUID') && sessionStorage.getItem('leikaULK')) {

      this.userId = sessionStorage.getItem('leikaUID');
      this.userLeikode = sessionStorage.getItem('leikaULK');
      console.log(this.userId);
      
      // get user data from database using its id
      this.crudService.getTypeRequest(`/${this.userId}`).subscribe({
        next: (res) => {
          // user data in userData observable
          console.log(res);
          // this.setLoggedUserData(res);
          
        },
        error: (err) => {
          // TODO: find a way to display error if user data is not fetched from database
          console.log(err);
        }
      });

      // // check if authToken cookie is stored/valid/expired
      // this.crudService.getTypeRequest('/protected/logged').subscribe(res => {
      //   // if status = false, authToken invalid
      //   this.authTokenValid = Object.values(res)[0];
      //   console.log(this.authTokenValid);
        
      //   if (this.authTokenValid !== true) {
      //     console.log('Token is invalid');
      //   }
      // });
    };

    /* if we were able to get user data using id from session storage AND authToken cookie is valid, user is logged in (can access logged components and its children) */
    // if (this.$userData && this.authTokenValid == true) {
    //   this.$isLoggedIn.next(true);
    // }
    // else {
    //   this.$isLoggedIn.next(false);
    // }

  }


  // GETTER AND SETTER TO SHARE USER DATA WITHIN THE APP

  // to get user data from this service
  getLoggedUserData() {
    this.$userData.next(this.userData);
  }

  // to send user data that was edited from componenens back to this service  
  setLoggedUserData(setUserData: any) {
    this.$userData.next(setUserData);
  }


}
