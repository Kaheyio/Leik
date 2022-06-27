import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  // User collection
  baseUrl = 'http://localhost:3000/api/user';

  // TODO: maintain state with page reload
  // User BehaviorSubject (to share logged user data and new leikode within the app)
  private $userData = new BehaviorSubject<any>('');
  userData = this.$userData.asObservable();

  private $userLeikode = new BehaviorSubject<any>('');
  userLeikode = this.$userLeikode.asObservable();

  private $isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.$isLoggedIn.asObservable();


  constructor(private http: HttpClient) { }

  getTypeRequest(url: any) {
    return this.http.get(`${this.baseUrl}${url}`).pipe(map(res => {
      return res;
    }));
  };

  // for login
  postTypeRequest(url: any, payload: any) {
    // add withCredentials : true to get cookie from server in browser storage
    return this.http.post(`${this.baseUrl}${url}`, payload, { withCredentials : true }).pipe(map(res => {
      return res;
    }));
  };


  putTypeRequest(url: any, payload: any) {
    return this.http.put(`${this.baseUrl}${url}`, payload).pipe(map(res => {
      return res;
    }));
  };

  deleteTypeRequest(url: any) {
    return this.http.delete(`${this.baseUrl}${url}`).pipe(map(res => {
      return res;
    }));
  };


  // set BehaviorSubject to get user data and new generated leikode on login
    // TODO: maintain state with page reload
  getLoggedUserData(userData: any, userLeikode: any) {
    this.$userData.next(userData);
    this.$userLeikode.next(userLeikode);
    this.$isLoggedIn.next(true);
  }


}
