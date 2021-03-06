import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StudentsListComponent } from "./components/students-list/students-list.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { CreateProductComponent } from "./components/product/createproduct.component";
import { ViewProductComponent } from "./components/home/view-product/view-product.component";
import { CreateAnnonceComponent } from "./components/product/createannonce/createannonce.component";
import { UserComponent } from "./components/user/user/user.component";
import { UserAdminComponent } from "./components/user/user-admin/user-admin.component";
import { AdminViewUserInfosComponent } from "./components/user/user-admin/admin-view-user-infos/admin-view-user-infos.component";
import { AdminViewCategorieComponent } from "./components/user/user-admin/admin-view-categorie/admin-view-categorie.component";
import { UserProductComponent } from "./components/user/user-product/user-product.component";
import { SearchProductCategorieComponent } from "./components/home/search-product/search-product.component";
import { IsUserLoginGuard } from "./components/guard/is-user-login.guard";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "app-home" },
  { path: "app-home", component: HomeComponent },
  { path: "product/:productId", component: ViewProductComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "user-admin/:page", component: UserAdminComponent },
  { path: "admin/user/:userId", component: AdminViewUserInfosComponent },
  {
    path: "admin/categorie/:categorieId",
    component: AdminViewCategorieComponent,
  },

  { path: "createproduct", component: CreateProductComponent },
  { path: "annonce", component: CreateAnnonceComponent },

  { path: "user", component: UserComponent },

  {
    path: "user/:page",
    component: UserComponent,
    canActivate: [IsUserLoginGuard],
  },
  { path: "user/product/:productId", component: UserProductComponent },

  { path: "categorie/:categorie", component: SearchProductCategorieComponent },
  {
    path: "subcategorie/:categorie/:subcategorie",
    component: SearchProductCategorieComponent,
  },

  { path: "type/:type", component: SearchProductCategorieComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
