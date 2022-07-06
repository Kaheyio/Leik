import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // to get data from session storage (that was put there on login)
  userId: any;
  // userLeikode: any;

  // to check authToken = in cookie storage + valid
  authTokenValid: any;

  // BehaviorSubject (to share logged user data within the app)
  // user data
  private $userData = new BehaviorSubject<any>('');
  userData = this.$userData.asObservable();

  // newly generated leikode (not hashed)
  private $userLeikode = new BehaviorSubject<any>('');
  userLeikode = this.$userLeikode.asObservable();



  constructor(private crudService: CrudService) {
    // TODO: get rid of this log
    console.log('DataService created');


    /* get user id and leikode that were put in session storage on login
     [NB: to keep data displayed if page is refreshed] */
    if (sessionStorage.getItem('leikaUID') && sessionStorage.getItem('leikaULK')) {

      this.userId = sessionStorage.getItem('leikaUID');
      this.$userLeikode.next(sessionStorage.getItem('leikaULK'));
      // console.log(this.userId);

      // get user data from database using its id
      this.crudService.getTypeRequest(`/users/${this.userId}`).subscribe({
        next: (res) => {
          // user data in userData observable         
          this.setLoggedUserData(res);
          // when put inside the observer, user data is at index 6 of the object
          // console.log(Object.values(this.$userData)[6]); 
        },
        error: (err) => {
          // TODO: find a way to display error if user data is not fetched from database
          console.log(err);
        }
      });

      // check if authToken cookie is stored/valid/expired
      this.crudService.getTypeRequest('/auth/protected/logged').subscribe(res => {
        // if status = false, authToken invalid
        this.authTokenValid = Object.values(res)[0];
        // console.log(this.authTokenValid);

        if (this.authTokenValid !== true) {
          console.log('Token is invalid');
        }
      });
    };

  }


  // SETTER TO SHARE USER DATA WITHIN THE APP

  // NOT WORKING !!! = to get user data from this service 
  // getLoggedUserData() {
  //   this.$userData.next(this.userData);
  // }

  // to send user data that was edited from componenens back to this service  
  setLoggedUserData(setUserData: any) {
    this.$userData.next(setUserData);
  }

  // TODO: put this method in auth guard service ?
  clearSessionStorage() {
    sessionStorage.clear();
  }


}
