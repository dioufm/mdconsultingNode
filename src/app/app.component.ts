import { Component, ViewChild, HostListener, OnInit } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { Router } from "@angular/router";
import { AuthenticationService } from "./services/authentication.service";
import { User } from "./shared/user";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { ToastContainerDirective, ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  currentUser: User;
  opened = true;
  title;
  @ViewChild("sidenav", { static: true }) sidenav: MatSidenav;

  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer: ToastContainerDirective;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
    //default user
    this.matIconRegistry.addSvgIcon(
      "user_icon",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../assets/icons/svg/user_icon.svg"
      )
    );

    //mmobilier
    this.matIconRegistry.addSvgIcon(
      "house_icon",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../assets/icons/svg/house_icon.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "appart_icon",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../assets/icons/svg/appart_icon.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "terrain_icon",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../assets/icons/svg/terrain_icon.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "autre_icon",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../assets/icons/svg/autre_icon.svg"
      )
    );

    //mmobilier
    this.matIconRegistry.addSvgIcon(
      "car_icon",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../assets/icons/svg/car_icon.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "motos_icon",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../assets/icons/svg/motos_icon.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "camion_icon",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../assets/icons/svg/camion_icon.svg"
      )
    );

    this.matIconRegistry.addSvgIcon(
      "boite_vitesse_manuelle",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../assets/icons/svg/boite_vitesse_manuelle.svg"
      )
    );

    this.matIconRegistry.addSvgIcon(
      "boite_vitesse_automatique",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../assets/icons/svg/boite_vitesse_automatique.svg"
      )
    );

    this.matIconRegistry.addSvgIcon(
      "diesel_icon",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../assets/icons/svg/diesel_icon.svg"
      )
    );

    this.matIconRegistry.addSvgIcon(
      "essence_icon",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../assets/icons/svg/essence_icon.svg"
      )
    );

    this.matIconRegistry.addSvgIcon(
      "two_icon",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../assets/icons/svg/two_icon.svg"
      )
    );

    this.matIconRegistry.addSvgIcon(
      "four_icon",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../assets/icons/svg/four_icon.svg"
      )
    );

    this.matIconRegistry.addSvgIcon(
      "five_icon",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../assets/icons/svg/five_icon.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "seven_icon",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../assets/icons/svg/seven_icon.svg"
      )
    );
  }

  ngOnInit() {
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 100);
    /*
    if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }
  */

    this.toastrService.overlayContainer = this.toastContainer;
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    /*
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55
      this.opened = true;
    }
    */
  }

  isBiggerScreen() {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }
}
