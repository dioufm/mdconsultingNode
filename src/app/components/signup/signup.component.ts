import { Component, OnInit, NgZone } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
//import { environment } from '../../../../environments/environment';
//import { ReportService } from 'src/app/services/report/report.service';
import { Router } from '@angular/router';
//import { CommonService } from 'src/app/services/common/common.service';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ApiService } from 'src/app/shared/api.service';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userForm: FormGroup;

  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  matcher = new MyErrorStateMatcher();

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private ngZone: NgZone,
    public fb: FormBuilder) {

    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      user_email: ['', [Validators.required]],
      user_password: ['', [Validators.required]],
      user_name: ['', [Validators.required]]
    })


  }

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  /* Submit book */
  submitsignupForm() {
    if (this.userForm.valid) {
      this.authenticationService.signup(this.f.user_name.value, this.f.user_email.value, this.f.user_password.value)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigateByUrl('/');
          },
          error => {
            this.error = error;
            this.loading = false;
          });
      /*
      this.authenticationService.signup(this.userForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/'))
      });
      */
    }
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/signup']);
  }


}



