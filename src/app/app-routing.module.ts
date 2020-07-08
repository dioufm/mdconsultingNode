import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CreateProductComponent } from './components/product/createproduct.component';
import { ViewProductComponent } from './components/home/view-product/view-product.component';
import { CreateAnnonceComponent } from './components/product/createannonce/createannonce.component';
import { UserComponent } from './components/user/user/user.component';
import { UserAdminComponent } from './components/user/user-admin/user-admin.component';
import { AdminViewUserInfosComponent } from './components/user/user-admin/admin-view-user-infos/admin-view-user-infos.component';
import { AdminViewCategorieComponent } from './components/user/user-admin/admin-view-categorie/admin-view-categorie.component';
import { UserProductComponent } from './components/user/user-product/user-product.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'app-home' },
  { path: 'app-home', component: HomeComponent },
  { path: 'product/:productId', component: ViewProductComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'user-admin/:page', component: UserAdminComponent },
  { path: 'admin/user/:userId', component: AdminViewUserInfosComponent },
  { path: 'admin/categorie/:categorieId', component: AdminViewCategorieComponent },


  { path: 'createproduct', component: CreateProductComponent },
  { path: 'annonce', component: CreateAnnonceComponent },

  { path: 'user', component: UserComponent },

  { path: 'user/:page', component: UserComponent },
  { path: 'user/product/:productId', component: UserProductComponent },


  { path: 'add-student', component: AddStudentComponent },
  { path: 'edit-student/:id', component: EditStudentComponent },
  { path: 'students-list', component: StudentsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }