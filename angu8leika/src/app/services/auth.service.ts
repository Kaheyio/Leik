import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // TODO: put auth methods in this service and data methods in apiservice

  // TODO: use backend methods to set and get cookies in api service, no nedd for this service ???

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

  
}
