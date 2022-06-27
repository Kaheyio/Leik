import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // SINGLETON SERVICE

  // private getUserData: any;
  // private getUserLeikode: any;



  // TODO: maintain state with page reload
  // User BehaviorSubject (to share logged user data and new leikode within the app)
  private $userData = new BehaviorSubject<any>('');
  userData = this.$userData.asObservable();

  private $userLeikode = new BehaviorSubject<any>('');
  userLeikode = this.$userLeikode.asObservable();

  private $isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.$isLoggedIn.asObservable();



  constructor() {
    // TODO: get rid of log
    console.log('ApiService created');

    // TODO: test with data in session storage
    // if user data in session storage (user logged and no tab closed), pass it to all the components
    const storedUserData = sessionStorage.getItem('leikaUD');
    const storedUserLeikode = sessionStorage.getItem('leikaULK');

    if (storedUserData && storedUserLeikode) {
      this.$isLoggedIn.next(true);
      this.setLoggedUserData(storedUserData, storedUserLeikode);
    }
    else {
      this.$isLoggedIn.next(false);
    }
  }

  // TODO: FOR DATA CRUD


  // set BehaviorSubject to get user data and new generated leikode
  // TODO: maintain state with page reload
  // getLoggedUserData() {
  //   this.$userData.next(this.getUserData);
  //   this.$userLeikode.next(this.getUserLeikode);
  //   // this.$isLoggedIn.next(isLoggedIn);
  // }


  setLoggedUserData(userData: any, userLeikode: any) {
    this.$userData.next(userData);
    this.$userLeikode.next(userLeikode);
  }



}
