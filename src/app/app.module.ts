import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Angular 8 components */
import { AddStudentComponent } from './components/add-student/add-student.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { StudentsListComponent } from './components/students-list/students-list.component';

/* Angular material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

/* Angular 8 http service */
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

/* Angular 8 CRUD services */
import { ApiService } from './shared/api.service';

/* Reactive form services in Angular 8 */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { SignupComponent } from './components/signup/signup.component';
import { AdminComponent } from './components/admin/admin.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { CreateProductComponent } from './components/product/createproduct.component';
import { SubProductComponent } from './components/product/subproduct/subproduct.component';

import { ModalModule, BsModalService, BsModalRef, BsLocaleService } from 'ngx-bootstrap';
import { FileSelectDirective } from 'ng2-file-upload'

import { MatIconModule } from "@angular/material/icon";


import { SocialLoginModule } from 'angularx-social-login';
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { ViewProductComponent } from './components/home/view-product/view-product.component';

import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';

import { ToastrModule } from 'ngx-toastr';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';
import { DateAgoPipe } from './pipe/date-ago.pipe';

registerLocaleData(localeFr, 'fr-FR', localeFrExtra);


const CONFIG = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('815952117538-290ne08t0phn8tj95l1n6p0eptncht0p.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('840919589761249')
  }
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
    AdminComponent,
    CreateProductComponent,
    SubProductComponent,

    AddStudentComponent,
    EditStudentComponent,
    StudentsListComponent,

    FileSelectDirective,
    DateAgoPipe
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
    ToastrModule.forRoot() // ToastrModule added
  ],
  entryComponents: [SubProductComponent],
  providers:
    [
      { provide: ApiService },
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      {
        provide: AuthServiceConfig,
        useFactory: provideConfig
      },
      BsModalService,
      BsModalRef
    ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }