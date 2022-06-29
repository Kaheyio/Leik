import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.scss']
})
export class LoggedComponent implements OnInit {

  userData: any;

  constructor(private crudService: CrudService, private router: Router, public dataService: DataService) { }

  ngOnInit(): void {

    // get user data from data service 
    // console.log(this.dataService.getLoggedUserData());
    
    this.dataService.getLoggedUserData();
    
    // TODO: test with data in session storage
    // log out if this.$isLoggedIn is false
    // if (!this.dataService.isLoggedIn) {
    //   this.logout();
    // }

  }

// TODO: create 3 log out conditions depending on click, session storage and protection cookie's expiration
  logout() {

    this.crudService.getTypeRequest('/protected/logout').subscribe({
      next: (res) => {
        console.log(Object.values(res)[0]);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }



}
