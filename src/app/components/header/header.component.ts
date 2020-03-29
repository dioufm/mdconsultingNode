import { Component, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/shared/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() title: any;
  currentUser: User;
  isAdmin = false;
  isUser = false;
  isModerateur = false;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.isAdmin = this.currentUser != null && this.currentUser.roles[0] == 'ROLE_ADMIN';
    this.isUser = this.currentUser != null && this.currentUser.roles[0] == 'ROLE_USER';
    this.isModerateur = this.currentUser != null && this.currentUser.roles[0] == 'ROLE_MODERATOR';
  }

  ngOnInit() {

  }

  logout() {
    this.authenticationService.logout();
    this.initUser();
    this.router.navigate(['/login']);
  }

  initUser() {
    this.isAdmin = false;
    this.isUser = false;
    this.isModerateur = false;
  }


}
