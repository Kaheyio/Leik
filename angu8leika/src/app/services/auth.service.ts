import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


    // User collection
    baseUrl = 'http://localhost:3000/api/user';

  constructor(private http: HttpClient) { }

  // TODO: put auth methods in this service


  // getUserDetails() {
  //   if(localStorage.getItem('userData')){
  //     return localStorage.getItem('userData')
  //   }else{
  //     return null
  //   }
    
  // }
  // setDataInLocalStorage(variableName: any, data: any) {
  //     localStorage.setItem(variableName, data);
  // }
  // getToken() {
  //     return localStorage.getItem('token');
  // }
  // clearStorage() {
  //     localStorage.clear();
  // }


  getTypeRequest(url: any) {
    return this.http.get(`${this.baseUrl}${url}`).pipe(map(res => {
      return res;
    }));
  };

  postTypeRequest(url: any, payload: any) {
    return this.http.post(`${this.baseUrl}${url}`, payload).pipe(map(res => {
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
 
}
