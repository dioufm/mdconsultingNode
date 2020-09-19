import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { FileUploader } from "ng2-file-upload";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { first } from "rxjs/operators";
import { AuthenticationService } from "../../../services/authentication.service";
import { ProductService } from "../../../services/product.service";
import { UserService } from "../../../services/user.service";
import { CommonService } from "../../../shared/common.service";
import { User } from "../../../shared/user";
import { MessageService } from "../../../services/message.service";

7;

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({
    isHTML5: true,
  });
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
  isChangePhotoProfile = false;

  page = null;

  isShowDashboard = false;
  isShowUserInfo = false;
  isShowAnnonce = false;
  isShowMessages = false;
  title = "";
  products = [];

  messages = [];

  ifSendMessageAnswer = false;
  answerMessageForm: FormGroup;
  currentMessage;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private productService: ProductService,
    private userService: UserService,
    private commonService: CommonService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.userId = null;
    this.commonService.getNavigatePageEvent().subscribe((page) => {
      if (page != null) {
        this.page = page;
        this.isShowDashboard = false;
        this.isShowUserInfo = false;
        this.isShowAnnonce = false;
        this.isShowMessages = false;
        if (this.page == null || this.page == "userinfo") {
          this.title = "Mes informations personnelles";
          this.isShowUserInfo = true;
        }
        if (this.page == "dashboard") {
          this.isShowDashboard = true;

          this.title = "Mon tableau de bord";
        }
        if (this.page == "annonces") {
          this.isShowAnnonce = true;
          this.title = "Mes annonces";
        }
        if (this.page == "messages") {
          this.isShowMessages = true;
          this.title = "Mes messages";
        }
      }
    });

    this.userForm = this.fb.group({
      _id: ["", [Validators.required]],
      firstname: ["", [Validators.required]],
      username: ["", [Validators.required]],
      email: ["", [Validators.required]],
      tel: ["", []],
      telwhatsapp: ["", []],
      showTel: ["", []],
      showTelWhatsapp: ["", []],
      newpassword: ["", []],
      role: ["", [Validators.required]],
      file: ["", []],
    });

    this.authenticationService.currentUser.subscribe((data) => {
      this.currentUser = data;
      if (this.currentUser != null) {
        this.uploader = this.userService.addUserPicture(this.currentUser.id);
        this.userService.getUserBuyUserId(this.currentUser.id).subscribe(
          (data) => {
            this.user = data.user;
            this.f["role"].setValue(data.roles[0]);
            this.f["_id"].setValue(data.id);
            //this.user.roles = data.roles;
            this.user.roles = ["ROLE_ADMIN", "ROLE_USER", "ROLE_MODERATOR"];

            this.userForm.patchValue(this.user);
          },
          (error) => {
            this.error = error;
            this.loading = false;
          }
        );
      }
      // les annonces du user
      this.productService.getProductsByUserId(this.currentUser.id).subscribe(
        (data) => {
          this.products = data;
        },
        (error) => {
          this.error = error;
          this.loading = false;
        }
      );

      // les messages du user
      this.messageService.getMessagesByUserId(this.currentUser.id).subscribe(
        (data) => {
          this.messages = data;
        },
        (error) => {
          this.error = error;
          this.loading = false;
        }
      );
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.userForm.controls;
  }

  get fa() {
    return this.answerMessageForm.controls;
  }

  changePassword() {
    this.isChangePassword = true;
  }

  changePhotoProfile() {
    this.isChangePhotoProfile = true;
  }

  addUserPicture() {
    this.uploader.uploadAll();
  }

  validateUserInfo() {
    if (this.userForm.valid) {
      this.user = new User(this.userForm.value);
      this.userService
        .validateUserInfo(this.user)
        .pipe(first())
        .subscribe(
          (data) => {
            if (data != null) {
              this.toastr.success("Vos informations ont été mise à jour");
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
      this.productService.removeProduct(productId).subscribe(
        (data) => {
          this.toastr.success("Votre annonce a été supprimée");
        },
        (error) => {
          this.toastr.error("une erreur est présente. Merci de reesayer.");
          this.error = error;
          this.loading = false;
        }
      );
    }
  }

  startAnswerMessageProduct(message) {
    this.ifSendMessageAnswer = true;
    this.currentMessage = message;

    this.answerMessageForm = this.fb.group(
      {
        message: ["Bonjour, voici ma reponse ?", [Validators.required]],
      },
      {}
    );
  }

  sendAnswerMessage() {
    this.messageService
      .createAnswerMessage(
        this.fa["message"].value,
        this.currentUser.id,
        this.currentMessage._id
      )
      .subscribe(
        (data) => {
          if (data != null) {
            this.toastr.success(this.error);
            this.ifSendMessageAnswer = false;
          }
        },
        (error) => {
          this.error = error;
          this.loading = false;
          this.toastr.error(this.error);
        }
      );
  }
}
