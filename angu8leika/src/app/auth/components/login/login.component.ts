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
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.isUserLogin();
  }

  onSubmit(){
    if (this.loginForm.invalid) {
      this.errorState = true;

      // TODO: return message generated in backend
      this.errorMessage = "Please indicate email and password";
      return;
    }

    // TODO: use login method from api and auth service
    console.log("Your form data: ", this.loginForm.value);    
  }

  // TODO: getuserdatils method from backend ?
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
  }

  logout(){
    // TODO: backend method in authservice to destroy cookie
    this.router.navigate(['']);
  }

}
