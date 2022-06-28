import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // SINGLETON SERVICE

  // TODO: maintain state with page reload
  // User BehaviorSubject (to share logged user data and new leikode within the app)
  private $userData = new BehaviorSubject<any>('');
  userData = this.$userData.asObservable();

  private $userLeikode = new BehaviorSubject<any>('');
  userLeikode = this.$userLeikode.asObservable();

  private $isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.$isLoggedIn.asObservable();

  // storedUserData: any;
  // storedUserLeikode: any;

  constructor() {
    // TODO: get rid of log
    console.log('ApiService created');

    // TODO: create array for userdata
    // TODO: test with data in session storage
    // if user data in session storage (user logged and no tab closed), pass it to all the components
    // const storedUserData = sessionStorage.getItem('leikaUD');
    // const storedUserLeikode = sessionStorage.getItem('leikaULK');

     
    // get user data that was put in session storage on login and save it if page is refreshed
    // to keep data if page is refreshed
    if(sessionStorage.getItem('leikaUD')) {
      // this.storedUserData = sessionStorage.getItem('leikaUD');
      this.$userData.next(sessionStorage.getItem('leikaUD'));
    }

    if(sessionStorage.getItem('leikaULK')) {
      // this.storedUserLeikode = sessionStorage.getItem('leikaULK');
      this.$userLeikode.next(sessionStorage.getItem('leikaULK'));
    }
  
    

    if (this.$userData && this.$userLeikode) {
      this.$isLoggedIn.next(true);
      this.setLoggedUserData(this.userLeikode);
    }
    else {
      this.$isLoggedIn.next(false);
    }
  }

  // FOR PERSISTED DATA 

  // getters and setters for persisted data

  // to get data from this service
  getLoggedUserData() {
    this.$userData.next(this.userData);
    this.$userLeikode.next(this.userLeikode);
  }

  // TODO: STORE IN A USERDATA ARRAY
  // to store data in this service !!! change value of data in session storage before sending it to this service 
  setLoggedUserData(userLeikode: any) {
    // this.$userData.next(userData);
    this.$userLeikode.next(userLeikode);
  }



}
