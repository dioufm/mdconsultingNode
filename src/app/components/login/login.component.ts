import { Component, Input, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { first } from "rxjs/operators";
import { AuthenticationService } from "../../services/authentication.service";
import { CommonService } from "../../shared/common.service";
import { User } from "../../shared/user";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  @Input() isCreatingProduct: boolean;

  userForm: FormGroup;

  loading = false;
  submitted = false;
  returnUrl: string;
  error = "";

  matcher = new MyErrorStateMatcher();
  message = "";

  login = true;
  signup = false;

  subscription: Subscription;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private commonService: CommonService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      user_email: ["teste1@teste1.fr", [Validators.required]],
      user_password: ["teste1", [Validators.required]],
      user_name: ["", []],
    });

    this.commonService.getSubscribeEvent().subscribe((evtSubscribe) => {
      if (evtSubscribe) {
        this.commonService.setLoginEvent(true);
        this.router.navigateByUrl("/");
        this.login = true;
        this.signup = false;
      }
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.userForm.controls;
  }

  /* Submit book */
  submitLoginForm() {
    if (this.userForm.valid) {
      this.authenticationService
        .login(this.f.user_email.value, this.f.user_password.value)
        .pipe(first())
        .subscribe(
          (data) => {
            if (!this.isCreatingProduct) {
              this.commonService.setLoginEvent(true);
              this.router.navigateByUrl("/");
            } else {
              this.commonService.setLoginEventCreatingProduct(true);
              this.router.navigateByUrl("/annonce");
            }
            this.toastr.success("Vous êtes connecté.");
          },
          (error) => {
            this.message = error;
            this.error = error;
            this.loading = false;
          }
        );
    }
  }

  submitsignupForm() {
    if (this.userForm.valid) {
      this.authenticationService
        .signup(
          this.f.user_name.value,
          this.f.user_email.value,
          this.f.user_password.value
        )
        .pipe(first())
        .subscribe(
          (data) => {
            this.message = data;
            this.commonService.setSubscribeEvent(true);
            this.router.navigateByUrl("/login");
            this.toastr.success("Merci pour votre inscription.");
          },
          (error) => {
            this.message = error;
            this.error = error;
            this.loading = false;
          }
        );
    }
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  };

  goToSignup() {
    this.login = false;
    this.signup = true;
  }

  goToLogin() {
    this.login = true;
    this.signup = false;
  }
}
