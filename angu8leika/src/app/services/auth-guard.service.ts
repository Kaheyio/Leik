import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CrudService } from './crud.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {


  constructor(
    private router: Router,
    private crudService: CrudService
  ) { }


  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    this.crudService.getTypeRequest('/protected/logged').subscribe(res => {

      // if status = false, not allowed
      const accessAuthorized = Object.values(res)[0];
      console.log('Status of authorization: ' + accessAuthorized);
      if (accessAuthorized !== true) {
        console.log('You are not allowed to view this page');
        this.router.navigate(['/login']);
      }

      return true;
    })

    return true;

  }

}
