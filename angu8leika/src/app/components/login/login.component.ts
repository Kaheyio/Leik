import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLogin: boolean = false;

  // to check user email update user data in database (new leikode)
  user: any;

  // to store data in session storage and send to service
  userId: any;
  userLeikode: any;

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
    private router: Router,
    private crudService: CrudService,
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
        // res from backend = user data + generated_leikode
        this.user = Object.values(res)[0];
        // console.log(this.user);

        // remove previous error messages if login is validated
        this.errorState = false;

        // !!! THIS LOGS THE OLD LEIKODE !!!
        // console.log('new leikode: ' + this.user.leikode);

        // get new leikode
        this.userLeikode = Object.values(res)[1];
        // console.log(this.userLeikode);

        // get user id
        this.userId = this.user._id;
        // console.log(this.userId);
        
        
        // STORE USER ID AND NEW LEIKODE IN SESSION STORAGE
        sessionStorage.setItem('leikaUID', this.userId);
        sessionStorage.setItem('leikaULK', this.userLeikode);
        
        // redirect to logged component and its children components
        this.router.navigate(['/logged']);

        // reset login form
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



}
