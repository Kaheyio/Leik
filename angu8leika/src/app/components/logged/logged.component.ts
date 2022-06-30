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
  userLeikode: any;

  constructor(private crudService: CrudService, private router: Router, public dataService: DataService) { }

  ngOnInit(): void {

    this.getUserData();
    
    
    
    // TODO: log out if token is invalid or session storage is empty
    // log out if this.$isLoggedIn is false
    // if (!this.dataService.isLoggedIn) {
    //   this.logout();
    // }

  }


  getUserData(){
    // get user data from data service     
    // console.log(this.dataService.userData);
    this.dataService.userData.subscribe(data => {
      this.userData = data;
      // console.log(this.userData);
    })

    // get user leikode from data service (from session storage since it's not hashed)
    this.dataService.userLeikode.subscribe(data => {
      this.userLeikode = data;
    })
  }


// TODO: put log out method in auth guard service to call it everywhere in the app 
// log out on click 
logout() {

  // clear authToken from cookie storage
  // + in auth guard service, if authToken is not in browser or invalid, access is denied, redirect to login
    this.crudService.getTypeRequest('/protected/logout').subscribe({
      next: (res) => {
        console.log(Object.values(res)[0]);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
      }
    });

    // clear session storage
    this.dataService.clearSessionStorage();
  }



}
