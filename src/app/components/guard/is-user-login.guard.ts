import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { AuthenticationService } from "../../services/authentication.service";

@Injectable({
  providedIn: "root",
})
export class IsUserLoginGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private _router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isLogIn = this.authenticationService.currentUserValue != null;

    if (isLogIn !== true) {
      this._router.navigate(["/"]);
    }

    return isLogIn;
  }
}
