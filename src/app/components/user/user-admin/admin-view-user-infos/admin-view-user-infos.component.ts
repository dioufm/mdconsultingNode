import { Component, OnInit, Input } from "@angular/core";

import { Router, Route, ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";
import { AuthenticationService } from "../../../../services/authentication.service";
import { CommonService } from "../../../../shared/common.service";
7;

import { ProductService } from "../../../../services/product.service";

import { User } from "../../../../shared/user";
import { Subscription } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Product } from "../../../../shared/product";
import { UserService } from "../../../../services/user.service";
import { ImageItem } from "ng-gallery";

@Component({
  selector: "app-admin-view-user-infos",
  templateUrl: "./admin-view-user-infos.component.html",
  styleUrls: ["./admin-view-user-infos.component.css"],
})
export class AdminViewUserInfosComponent implements OnInit {
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

  userId;

  isChangePassword = false;

  users;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private productService: ProductService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get("userId");
    this.userService.getUserBuyUserId(this.userId).subscribe(
      (data) => {
        this.user = data.user;
        this.f["role"].setValue(data.roles[0]);
        //this.user.roles = data.roles;
        this.user.roles = ["ROLE_ADMIN", "ROLE_USER", "ROLE_MODERATOR"];
        this.userForm.patchValue(this.user);
      },
      (error) => {
        this.error = error;
        this.loading = false;
      }
    );

    this.userForm = this.fb.group({
      firstname: ["", [Validators.required]],
      username: ["", [Validators.required]],
      email: ["", [Validators.required]],
      tel: ["", []],
      telwhatsapp: ["", []],
      showTel: ["", []],
      showTelWhatsapp: ["", []],
      password: ["", [Validators.required]],
      role: ["", [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.userForm.controls;
  }

  changePassword() {
    this.isChangePassword = true;
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
              this.router.navigateByUrl("/user");
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

  removeUser(userId) {
    if (confirm("etes vous sur de supprimer ?")) {
      this.userService.remove(userId).subscribe(
        (data) => {
          this.users = data;
        },
        (error) => {
          this.error = error;
          this.loading = false;
        }
      );
    }
  }
}
