import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLogin: boolean = false;

  // user data
  user: any;

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
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.isUserLogin();
  }

  onSubmit() {

    // FORM VALDATION

    // empty form
    if (this.loginForm.invalid) {
      this.errorState = true;
      this.errorMessage = "Please indicate email and password";
      return;
    }

    // TODO: use login method from api when done
    console.log("Login form data: ", this.loginForm.value);

    // send email and password to backend for check  
    this.authService.postTypeRequest('/login', this.loginForm.value).subscribe({
      next: (res) => {
        this.user = res;
        console.log('You are logged in ! : ' + this.user.username);
      },
      error: (err) => {
        this.errorState = true;
        this.errorMessage = err.error;
      }
    });

    // this.authService.getByParamTypeRequest('/', this.loginForm.value.password).subscribe({
    //   next: (res) => {
    //     this.user = res;
    //     console.log(this.user);
    //   },
    //   error: (err) => {
    //     this.errorState = true;
    //     this.errorMessage = err.error;
    //   }
    // });


    // log in and generate leikode + token

    // this.authService.postTypeRequest('/login', this.loginForm.value).subscribe((res: any) => {


    //   if (res.status == 200) {
    //     console.log(res);

    //     // this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));  
    //     // this._auth.setDataInLocalStorage('token', res.token);  

    //     // TODO: navigate to logged page
    //     // this.isLogin = true;
    //     // this.router.navigate(['']);

    //   }

    //   // if(res.status == 400) {
    //   //   this.errorState = true;
    //   // this.errorMessage = res;
    //   // console.log('test' + res);

    //   // }


    //   // TODO: handle errors so if !res.status handle errors else log in
    // });


    // this._api.postTypeRequest('user/login', form.value).subscribe((res: any) => {

    //   if (res.status) { 

    //     this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));  
    //     this._auth.setDataInLocalStorage('token', res.token);  
    //     this._router.navigate(['']);
    //   }
    // })

  };

  // TODO: getuserdetails from cookie in login method and not from token set in localStorage
  // isUserLogin() {
  //   if (this.authService.getUserDetails() != null) {
  //     this.isLogin = true;
  //   }
  // }

  // toggle password
  togglePW() {
    if (this.togglePassword?.nativeElement.type === "password") {
      this.togglePassword.nativeElement.type = "text";
    } else {
      this.togglePassword.nativeElement.type = "password";
    }
  };

  logout() {
    // TODO: backend method in authservice to destroy cookie
    // this._auth.clearStorage()
    this.router.navigate(['']);
  };

}
