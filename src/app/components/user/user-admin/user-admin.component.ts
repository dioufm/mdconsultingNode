import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../app/services/user.service';
import { CategorieService } from '../../../../app/services/categorie.service';
import { CommonService } from '../../../../app/shared/common.service';
import { AuthenticationService } from '../../../../app/services/authentication.service';
import { User } from '../../../../app/shared/user';


@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css']
})
export class UserAdminComponent implements OnInit {
  userForm: FormGroup;

  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';


  links = ['users', 'Products', 'Third'];
  activeLink = this.links[0];
  background: ThemePalette = undefined;

  userId = null;

  users = {};
  categories = [];

  page = null;

  currentUser: User;

  toggleBackground() {
    this.background = this.background ? undefined : 'primary';
  }

  addLink() {
    this.links.push(`Link ${this.links.length + 1}`);
  }

  constructor(
    private userService: UserService,
    private categorieService: CategorieService,
    private router: Router,
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private authenticationService: AuthenticationService) {

  }

  ngOnInit() {

    this.userId = null;
    this.commonService.getNavigatePageEvent()
      .subscribe(page => {
        if (page != null) {
          this.page = page;
          if (this.page == 'users') {
            this.userService.getAllUsers()
              .subscribe(
                data => {
                  this.users = data;
                },
                error => {
                  this.error = error;
                  this.loading = false;
                });
          }
          if (this.page == 'categories') {
            this.categorieService.getAllCategories()
              .subscribe(
                data => {
                  this.categories = data;
                },
                error => {
                  this.error = error;
                });
          }
        }
      });


  }

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  viewUser(userId) {
    this.router.navigate(["admin/user", userId]);
  }

  removeUser(userId) {
    if (confirm('etes vous sur de supprimer ?')) {
      this.userService.remove(userId).subscribe(
        data => {
          this.users = data;
        },
        error => {
          this.error = error;
          this.loading = false;
        });
    }
  }


  viewCategorieDetails(categorieId) {
    this.router.navigate(["admin/categorie", categorieId]);
  }

  removeCategorie(categorieId) {
    if (confirm('etes vous sur de supprimer ?')) {
      this.categorieService.remove(categorieId).subscribe(
        data => {
          this.users = data;
        },
        error => {
          this.error = error;
          this.loading = false;
        });
    }
  }


  addNewCategorie() {
    this.router.navigate(["admin/categorie", 'newCategorie']);
  }

}



