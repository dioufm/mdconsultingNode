import { Component, OnInit, Input } from "@angular/core";

import { Router } from "@angular/router";
import { first } from "rxjs/operators";
import { AuthenticationService } from "../../../services/authentication.service";
import { CommonService } from "../../../shared/common.service";
7;

import { ProductService } from "../../../services/product.service";

import { User } from "../../../shared/user";
import { Subscription } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Product } from "../../../shared/product";
import { UserService } from "../../../../app/services/user.service";

@Component({
  selector: "app-user-infos",
  templateUrl: "./user-infos.component.html",
  styleUrls: ["./user-infos.component.css"],
})
export class UserInfosComponent implements OnInit {
  @Input() product: Product;

  userForm: FormGroup;

  loading = false;
  submitted = false;
  returnUrl: string;
  error = "";

  message = "";

  login = true;
  signup = false;

  user: User;

  currentUser: User;

  subscription: Subscription;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;

    this.userForm = this.fb.group({
      user_firstname: ["firstNameTest", [Validators.required]],
      user_name: ["nameTest", [Validators.required]],
      email: ["teste2@teste2.fr", [Validators.required]],
      tel: ["00221584756", [Validators.required]],
      telwhatsapp: ["00221584756", [Validators.required]],
      showTel: ["0", []],
      showTelWhatsapp: ["0", []],
    });

    this.f["user_name"].setValue(this.currentUser.username);
    this.f["email"].setValue(this.currentUser.email);

    if (this.currentUser.firstname != null) {
      this.f["user_firstname"].setValue(this.currentUser.firstname);
    }
    if (this.currentUser.tel != null) {
      this.f["tel"].setValue(this.currentUser.tel);
    }
    if (this.currentUser.telwhatsapp != null) {
      this.f["telwhatsapp"].setValue(this.currentUser.telwhatsapp);
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.userForm.controls;
  }

  validateProduct() {
    if (this.userForm.valid) {
      this.user = new User(this.userForm.value);
      this.userService
        .updateUserInfo(this.product._id, this.user)
        .pipe(first())
        .subscribe(
          (data) => {
            if (data != null) {
              this.router.navigateByUrl("/user/dashboard");
              this.toastr.success("Votre annonce a été créee et publiée.");
            } else {
              this.toastr.error("une erreur est présente. Merci de reesayer.");
            }
          },
          (error) => {
            this.message = error;
            this.error = error;
            this.loading = false;
          }
        );
    }
  }

  removeProduct(productId) {
    if (confirm("etes vous sur de supprimer cette annonce ?")) {
    }
  }
}
