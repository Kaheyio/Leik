import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from './services/auth-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angu8leika';

  login = false;
  logged = false;

    // TODO: TEST
  // protected route data
  public protectedRouteData: any;
  public loading: boolean = false;

  // TODO: GET USER DATA AND NEW LEIKODE AFTER LOGIN
  constructor(private authGuardService: AuthGuardService){}

  ngOnInit(): void {
     // protected route data
     this.authGuardService.getTypeRequest('/').subscribe((res: any) => {
      this.protectedRouteData = res;
      // this.loading = true;
    });
  }
}
