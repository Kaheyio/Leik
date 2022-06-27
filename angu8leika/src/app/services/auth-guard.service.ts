import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  // Protected route
  baseUrl = 'http://localhost:3000/api/user';


  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { }

 
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // TODO: if cookie is in browser return true else redirect
    // use authorization header/ bearer token ??
this.authService.getTypeRequest('/logged').subscribe(res => {

  // if status = false, not allowed
  const accessAuthorized = Object.values(res)[0];
  console.log('status of authorization: ' + accessAuthorized);
  if (accessAuthorized !== true) {
    console.log('You are not allowed to view this page');
    this.router.navigate(['/login']);
  }

    return true;
})

    return true;
   
  }

}
