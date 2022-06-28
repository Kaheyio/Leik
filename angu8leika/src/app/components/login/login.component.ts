import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLogin: boolean = false;

  // user data
  user: any;

  // object array to store user data
  userData: any;
  leikode: any;

  // error message
  errorState: boolean = false;
  errorMessage: any;

  // login form
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required)
  });

  // toggle password = get element by id
  @ViewChild("togglePassword") togglePassword!: ElementRef;

  constructor(
    private crudService: CrudService,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {

    // FORM VALDATION

    // empty form
    if (this.loginForm.invalid) {
      this.errorState = true;
      this.errorMessage = "Please indicate valid email and password";
      return;
    }

    // console.log("Login form data: ", this.loginForm.value);

    // send email and password to backend for check, if ok, generate token and put in cookie (for logged state protection) 
    this.crudService.postTypeRequest('/login', this.loginForm.value).subscribe({
      next: (res) => {
        // res = user + generated_leikode
        this.user = Object.values(res)[0];
        // console.log(this.user);

        // console.log('You are logged in ! : ' + this.user.username);
        this.errorState = false;

        // !!! THIS LOGS THE OLD LEIKODE !!!
        // console.log('new leikode: ' + this.user.leikode);

        // get new leikode
        this.leikode = Object.values(res)[1];
        // console.log(this.leikode);

        // TODO: STORE LEIKODE IN SESSION STORAGE
        
        const storedUserLeikode = this.leikode;
        sessionStorage.setItem('leikaULK', storedUserLeikode);

        // TODO: "store" userData with data in session storage => in api service, to retrieve them in the rest of the app
        this.apiService.setLoggedUserData(storedUserLeikode);

        // redirect to logged components
        this.router.navigate(['/logged']);



        // reset form
        this.loginForm.reset();

      },
      error: (err) => {
        this.errorState = true;
        this.errorMessage = err.error;
      }
    });

  };


  // toggle password
  togglePW() {
    if (this.togglePassword?.nativeElement.type === "password") {
      this.togglePassword.nativeElement.type = "text";
    } else {
      this.togglePassword.nativeElement.type = "password";
    }
  };


  // TODO: change boolean value in app component + log out method in logged component

}
