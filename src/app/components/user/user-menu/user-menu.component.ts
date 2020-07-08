import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { CommonService } from '../../../shared/common.service';
import { User } from '../../../shared/user';


@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {

  isAdmin = false;
  loading = false;
  submitted = false;
  error = '';

  message = '';

  currentUser: User;

  page = null;


  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private commonService: CommonService) {

  }


  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
    this.isAdmin = this.currentUser != null && this.currentUser.roles[0] == 'ROLE_ADMIN';

    this.route.params.subscribe(params => {
      this.page = params['page'];
      if (this.page != null) {
        this.commonService.setNavigatePageEvent(this.page);
      }
    });
  }



  public displayLinkActivatedCss(field) {
    if (this.page == field) {
      return 'list-group-item list-group-item-action active'
    } else {
      return 'list-group-item list-group-item-action '
    }

  }

}



