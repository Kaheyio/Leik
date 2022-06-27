import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorServiceService {

  constructor(private authService: AuthService) { }


// TODO: CHECK IF WE REALLY NEED IT???
  intercept(request: HttpRequest<any>,
    next: HttpHandler
    ): Observable<HttpEvent<any>> {
      if (!request.headers.has('Content-Type')) {
        request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
      }
      // request = request.clone({ headers: request.headers.set('Accept', 'application/json'), withCredentials: true });
      // // TODO: use cookie method ???
      // // .clone({
      // //   setHeaders: {
      // //     Authorization: `${this.authService.getToken()}`
      // //   }
      // // })

      // return next.handle(request);

      request = request.clone({ headers: request.headers.set('Accept', 'application/json'), withCredentials: true });
      
      return next.handle(request);
    }


}
