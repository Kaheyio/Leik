import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  // Protected route
  baseUrl = 'http://localhost:3000/api/protected';


  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getTypeRequest(url: any) {
    return this.http.get(`${this.baseUrl}${url}`).pipe(map(res => {
      return res;
    }));
  };


  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // TODO: if cookie is in browser return true else redirect

    




    // NB: you can save redirect url so after authing we can move them back to the page they requested initially

    return false;
  }

}
