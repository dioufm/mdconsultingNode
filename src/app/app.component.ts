import { Component, ViewChild, HostListener, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { User } from './shared/user';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  currentUser: User;
  opened = true;
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

    this.matIconRegistry.addSvgIcon(
      "house_icon",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/svg/house_icon.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "appart_icon",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/svg/appart_icon.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "terrain_icon",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/svg/terrain_icon.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "autre_icon",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/svg/autre_icon.svg")
    );



  }

  ngOnInit() {

    console.log(window.innerWidth)
    /*
    if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }
  */

  }

  @HostListener('window:resize', ['$event'])
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
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
