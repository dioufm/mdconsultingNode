import { Component, OnInit, NgZone } from '@angular/core';
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
import { ProductService } from 'src/app/services/product.service';
import { BsModalService } from 'ngx-bootstrap';
import { SubProductComponent } from './subproduct/subproduct.component';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.css']
})
export class CreateProductComponent implements OnInit {
  userForm: FormGroup;

  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  matcher = new MyErrorStateMatcher();
  message = '';

  categories = [];

  bsModalRef;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private productService: ProductService,
    private fb: FormBuilder,
    private modalService: BsModalService) {


  }

  ngOnInit() {
    this.userForm = this.fb.group({
      user_email: ['', [Validators.required]],
      user_password: ['', [Validators.required]]
    });

    this.productService.getAllCategories()
      .subscribe(
        data => {
          //this.categories = data;
          this.categories = data;
        },
        error => {
          this.error = error;
          this.loading = false;
        });

  }

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  /* Submit book */
  submitcreateproductForm() {
    if (this.userForm.valid) {
      /*
      this.authenticationService.createproduct(this.f.user_email.value, this.f.user_password.value)
        .pipe(first())
        .subscribe(
          data => {
            this.commonService.setcreateproductEvent(true);
            this.router.navigateByUrl('/');
          },
          error => {
            this.message = error;
            this.error = error;
            this.loading = false;
          });
      /*
      this.authenticationService.createproduct(this.userForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/'))
      });
      */
    }
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }

  showCategorieModal(categorie) {
    const initialState = {
      categorie: categorie,
    };
    this.bsModalRef = this.modalService.show(SubProductComponent, { class: 'modal-lg', ignoreBackdropClick: true, initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
  }



}



