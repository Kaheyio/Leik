import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CrudService } from './crud.service';
import { DataService } from './data.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {


  constructor(
    private router: Router,
    private crudService: CrudService,
    private dataService: DataService
  ) { }


  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    this.crudService.getTypeRequest('/protected/logged').subscribe(res => {

      // TODO: PB = you have to reload the page for it to work + if you duplicate tab session storage is ok ?
      // if status = false, not allowed
      let accessAuthorized = Object.values(res)[0];
      // console.log('Status of authorization: ' + accessAuthorized);

      // if session storage is empty make token invalid and logout
      if (!sessionStorage.getItem('leikaUID') || !sessionStorage.getItem('leikaULK')) {
        this.crudService.getTypeRequest('/protected/logout').subscribe({
          next: (res) => {
            console.log(Object.values(res)[0]);
            this.router.navigate(['/login']);
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

        console.log('You are not allowed to view this page');
        this.router.navigate(['/login']);
      }

      return true;
    })

    return true;

  }

}
