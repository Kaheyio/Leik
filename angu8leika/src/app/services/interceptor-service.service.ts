import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorServiceService {

  constructor(private crudService: CrudService) { }


// TODO: CHECK IF WE REALLY NEED IT???
  intercept(request: HttpRequest<any>,
    next: HttpHandler
    ): Observable<HttpEvent<any>> {
      if (!request.headers.has('Content-Type')) {
        request = request.clone({ headers: request.headers.set('Content-Type', 'application/json'), withCredentials: true });
      }
      // request = request.clone({ headers: request.headers.set('Accept', 'application/json'), withCredentials: true });
      // // TODO: use cookie method ???
      // // .clone({
      // //   setHeaders: {
      // //     Authorization: `${this.crudService.getToken()}`
      // //   }
      // // })

      // return next.handle(request);

      request = request.clone({ headers: request.headers.set('Accept', 'application/json'), withCredentials: true });
      
      return next.handle(request);
    }


}
