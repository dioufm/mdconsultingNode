import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

/* Angular 8 components */
import { StudentsListComponent } from "./components/students-list/students-list.component";

/* Angular material */
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularMaterialModule } from "./material.module";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

/* Angular 8 http service */
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgxSpinnerModule } from "ngx-spinner";

/* Angular 8 CRUD services */
import { ApiService } from "./shared/api.service";

/* Reactive form services in Angular 8 */
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from "./components/home/home.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { LoginComponent } from "./components/login/login.component";
import { JwtInterceptor } from "./helpers/jwt.interceptor";
import { ErrorInterceptor } from "./helpers/error.interceptor";
import { SignupComponent } from "./components/signup/signup.component";
import { MatTabsModule } from "@angular/material/tabs";
import { MatGridListModule } from "@angular/material/grid-list";
import { CreateProductComponent } from "./components/product/createproduct.component";
import { SubProductComponent } from "./components/product/subproduct/subproduct.component";

import {
  ModalModule,
  BsModalService,
  BsModalRef,
  BsLocaleService,
} from "ngx-bootstrap";
import { FileSelectDirective } from "ng2-file-upload";

import { MatIconModule } from "@angular/material/icon";

import { SocialLoginModule } from "angularx-social-login";
import {
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angularx-social-login";
import { ViewProductComponent } from "./components/home/view-product/view-product.component";

import { GalleryModule } from "ng-gallery";
import { LightboxModule } from "ng-gallery/lightbox";

import { ToastrModule } from "ngx-toastr";
import { NgxPaginationModule } from "ngx-pagination";
import { OrderModule } from "ngx-order-pipe";

import { MatFormFieldModule, MatSelectModule } from "@angular/material";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";

import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";
import localeFrExtra from "@angular/common/locales/extra/fr";

import { LOCALE_ID } from "@angular/core";
import { DateAgoPipe } from "./pipe/date-ago.pipe";
import { CreateAnnonceComponent } from "./components/product/createannonce/createannonce.component";
import { ifCategorieImo } from "./components/directive/immo.directive";
import { ifCategorieVeh } from "./components/directive/veh.directive";
import { ThumbnailDirective } from "./components/directive/thumbnail.directive";
import { UserInfosComponent } from "./components/user/user-infos/user-infos.component";
import { MycurrencyPipe } from "./pipe/currency.pipe";
import { UserComponent } from "./components/user/user/user.component";
import { UserAdminComponent } from "./components/user/user-admin/user-admin.component";
import { UserMenuComponent } from "./components/user/user-menu/user-menu.component";
import { AdminComponent } from "./components/admin/admin.component";
import { AdminViewUserInfosComponent } from "./components/user/user-admin/admin-view-user-infos/admin-view-user-infos.component";
import { AdminViewCategorieComponent } from "./components/user/user-admin/admin-view-categorie/admin-view-categorie.component";
import { OrderByPipe } from "./pipe/order-by.pipe";
import { UserProductComponent } from "./components/user/user-product/user-product.component";
import { SearchProductHeaderComponent } from "./components/home/search-product-header/search-product-header.component";
import { SearchProductAsideComponent } from "./components/home/search-product-aside/search-product-aside.component";
import { SearchProductCategorieComponent } from "./components/home/search-product/search-product.component";
import { ProductResultComponent } from "./components/product/productresult/productresult.component";

registerLocaleData(localeFr, "fr", localeFrExtra);

const CONFIG = new AuthServiceConfig([
  /*
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('815952117538-290ne08t0phn8tj95l1n6p0eptncht0p.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('840919589761249')
  }*/
]);

export function provideConfig() {
  return CONFIG;
}

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AppComponent,

    HomeComponent,
    ViewProductComponent,

    LoginComponent,
    SignupComponent,
    CreateProductComponent,
    SubProductComponent,
    CreateAnnonceComponent,

    AdminComponent,
    AdminViewUserInfosComponent,
    AdminViewCategorieComponent,
    //user componenet
    UserInfosComponent,
    UserComponent,
    UserAdminComponent,
    UserMenuComponent,
    UserProductComponent,
    SearchProductHeaderComponent,
    SearchProductAsideComponent,
    SearchProductCategorieComponent,
    ProductResultComponent,

    FileSelectDirective,
    DateAgoPipe,
    ThumbnailDirective,
    MycurrencyPipe,
    OrderByPipe,

    ifCategorieImo,
    ifCategorieVeh,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    MatGridListModule,
    ModalModule.forRoot(),
    SocialLoginModule,
    GalleryModule,
    LightboxModule,
    ToastrModule.forRoot(), // ToastrModule added
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    OrderModule,
  ],
  entryComponents: [SubProductComponent],
  providers: [
    { provide: ApiService },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig,
    },
    BsModalService,
    BsModalRef,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
