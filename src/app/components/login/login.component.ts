import { Component, OnInit, NgZone, Input } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { Router } from '@angular/router';
//import { CommonService } from 'src/app/services/common/common.service';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ApiService } from 'src/app/shared/api.service';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/shared/common.service';

import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider, } from 'angularx-social-login';
import { User } from 'src/app/shared/user';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';



/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() isCreatingProduct: boolean;

  userForm: FormGroup;

  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  matcher = new MyErrorStateMatcher();
  message = '';

  login = true;
  signup = false;

  user: SocialUser;

  subscription: Subscription;


  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private commonService: CommonService,
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService) {

    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }

  }

  ngOnInit() {

    this.userForm = this.fb.group({
      user_email: ['teste1@teste1.fr', [Validators.required]],
      user_password: ['teste1', [Validators.required]],
      user_name: ['', []]
    });

    this.commonService.getSubscribeEvent()
      .subscribe(evtSubscribe => {
        if (evtSubscribe) {
          this.commonService.setLoginEvent(true);
          this.router.navigateByUrl('/');
          this.authService.authState.subscribe().unsubscribe();
          this.login = true;
          this.signup = false;
        }
      });

    this.authService.authState.subscribe((user) => {
      if (user != null) {
        this.authService.authState.subscribe().unsubscribe();
        //Check if login
        this.authenticationService.login(user.email, user.id)
          .pipe(first())
          .subscribe(
            data => {
              this.commonService.setLoginEvent(true);
              this.authService.authState.subscribe().unsubscribe();
              if (!this.isCreatingProduct) {
                this.router.navigateByUrl('/');
              } else {
                this.router.navigateByUrl('/createproduct');
              }

            },
            error => {
              this.authService.authState.subscribe().unsubscribe();
              let userModel = new User();
              userModel.username = user.firstName;
              userModel.password = user.id;
              userModel.email = user.email;
              this.authenticationService.loginSocial(userModel)
                .pipe(first())
                .subscribe(
                  data => {
                    this.authService.authState.subscribe().unsubscribe();
                    this.commonService.setLoginEvent(true);
                    if (!this.isCreatingProduct) {
                      this.commonService.setSubscribeEvent(true);
                      this.router.navigateByUrl('/');
                    } else {
                      this.commonService.setLoginEventCreatingProduct(true);
                      this.router.navigateByUrl('/createproduct');
                    }
                  },
                  error => {
                    this.authService.authState.subscribe().unsubscribe();
                    this.router.navigateByUrl('/login');
                    this.message = error;
                    this.error = error;
                    this.loading = false;
                  });
            });
      }
    });


  }

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  /* Submit book */
  submitLoginForm() {
    if (this.userForm.valid) {
      this.authenticationService.login(this.f.user_email.value, this.f.user_password.value)
        .pipe(first())
        .subscribe(
          data => {

            if (!this.isCreatingProduct) {
              this.commonService.setLoginEvent(true);
              this.router.navigateByUrl('/');
            } else {
              this.commonService.setLoginEventCreatingProduct(true);
              this.router.navigateByUrl('/createproduct');
            }
            this.toastr.success('Vous êtes connecté.');
          },
          error => {
            this.message = error;
            this.error = error;
            this.loading = false;
          });

    }
  }

  submitsignupForm() {
    if (this.userForm.valid) {
      this.authenticationService.signup(this.f.user_name.value, this.f.user_email.value, this.f.user_password.value)
        .pipe(first())
        .subscribe(
          data => {
            this.message = data;
            this.commonService.setSubscribeEvent(true);
            this.router.navigateByUrl('/login');
            this.toastr.success('Merci pour votre inscription.');
          },
          error => {
            this.message = error;
            this.error = error;
            this.loading = false;
          });

    }
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }

  goToSignup() {
    this.login = false;
    this.signup = true;
  }

  goToLogin() {
    this.login = true;
    this.signup = false;
  }



  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x => console.log(x));
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(x => console.log(x));
  }


  signOut(): void {
    this.authService.signOut();
  }



}



