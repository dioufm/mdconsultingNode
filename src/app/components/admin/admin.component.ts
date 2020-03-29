import { Component, OnInit, NgZone } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
//import { environment } from '../../../../environments/environment';
//import { ReportService } from 'src/app/services/report/report.service';
import { Router, ActivatedRoute } from '@angular/router';
//import { CommonService } from 'src/app/services/common/common.service';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher, ThemePalette } from '@angular/material/core';
import { ApiService } from 'src/app/shared/api.service';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  userForm: FormGroup;

  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  matcher = new MyErrorStateMatcher();

  links = ['users', 'Products', 'Third'];
  activeLink = this.links[0];
  background: ThemePalette = undefined;

  userId = null;

  users = {};

  toggleBackground() {
    this.background = this.background ? undefined : 'primary';
  }

  addLink() {
    this.links.push(`Link ${this.links.length + 1}`);
  }

  constructor(
    private userService: UserService,
    private router: Router,
    private ngZone: NgZone,
    public fb: FormBuilder,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.userId = null;
    this.route.params.subscribe(params => {
      if (params['userId'] != undefined) {
        this.userId = +params['userId']; // (+) converts string 'id' to a number
      } else {
        this.userId = null;
      }


      // In a real app: dispatch action to load the details here.
    });
    this.userService.getAllUsers()
      .subscribe(
        data => {
          this.users = data;
        },
        error => {
          this.error = error;
          this.loading = false;
        });

  }

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  viewUser(userId) {
    this.router.navigate(["admin", userId]);
  }

  removeUser(userId) {
    if (confirm('etes vous sur de supprimer ?')) {
      this.userService.remove(userId).subscribe(
        data => {
          this.users = data;
        },
        error => {
          this.error = error;
          this.loading = false;
        });
    }
  }

}



