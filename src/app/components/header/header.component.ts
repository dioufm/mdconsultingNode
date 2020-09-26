import { Component, Input } from "@angular/core";
import { AuthenticationService } from "src/app/services/authentication.service";
import { User } from "src/app/shared/user";
import { Router } from "@angular/router";
import { CommonService } from "src/app/shared/common.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent {
  @Input() title: any;
  currentUser: User;
  isAdmin = false;
  isUser = false;
  isModerateur = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private commonService: CommonService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
    this.initRoleUser();
    localStorage.setItem("defaultCountryCode", "SEN");
    localStorage.setItem("defaultLanguageCode", "FR");
  }

  private initRoleUser() {
    this.isAdmin =
      this.currentUser != null && this.currentUser.roles[0] == "ROLE_ADMIN";
    this.isUser =
      this.currentUser != null && this.currentUser.roles[0] == "ROLE_USER";
    this.isModerateur =
      this.currentUser != null && this.currentUser.roles[0] == "ROLE_MODERATOR";
  }

  ngOnInit() {
    this.commonService.getLoginEvent().subscribe((loginEvent) => {
      if (loginEvent) {
        this.initRoleUser();
      }
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }

  initUser() {
    this.isAdmin = false;
    this.isUser = false;
    this.isModerateur = false;
  }
}
