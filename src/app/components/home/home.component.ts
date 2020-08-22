import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../../../app/services/authentication.service';
import { ProductService } from '../../../app/services/product.service';
import { Product } from '../../../app/shared/product';
import { NgxSpinnerService } from "ngx-spinner";
import { OrderPipe } from "ngx-order-pipe";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class HomeComponent implements OnInit {
  name = environment.application.name;
  angular = environment.application.angular;
  bootstrap = environment.application.bootstrap;

  form: any = {};
  report: any;
  currentUser: any;

  products = [];

  loading = false;
  error = null;

  criteriaSearchProduct: Product;

  @Input() searchResult: any;

  @Input() searchCriteria: Product;

  sortedProducts: any[];

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  constructor(
    private meta: Meta,
    private titleService: Title,
    private router: Router,
    private authenticationService: AuthenticationService,
    private spinner: NgxSpinnerService,
    private productService: ProductService,
    private orderPipe: OrderPipe) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);



  }

  ngOnInit() {
    this.titleService.setTitle('Hello Affrica : Une application Progressive WebApp développée avec Angular');
    this.meta.addTag({
      name: 'Hello Affrica',
      content: 'Hello Affrica'
    });
    this.meta.updateTag(
      {
        name: 'description',
        content: 'Cette application a été développée avec angular version 8.2.12 et bootstrap ' +
          ' Elle applique le Routing, le Lazy loading, le Server side rendering et les Progressive Web App (PWA)'
      });

    this.products = [];

    this.spinner.show();
    this.productService.getProducts()
      .subscribe(
        data => {

          this.products = data;
          this.searchResult = this.products;
          if (this.products != null) {
            this.products = this.orderPipe.transform(this.products, "dateCreation");
          }
          this.spinner.hide();

        },
        error => {
          this.spinner.hide();
          this.error = error;
          this.loading = false;
        });
  }


  public filterList(searchParam: string): void {
    this.criteriaSearchProduct = new Product();
    this.criteriaSearchProduct.categorieProduct = searchParam;
    this.spinner.show();
    this.productService.getProductsByCriteria(this.criteriaSearchProduct)
      .subscribe(
        data => {
          this.products = data;
          this.searchResult = this.products;
          this.spinner.hide();
        },
        error => {
          this.spinner.hide();
          this.error = error;
          this.loading = false;
        });
  }


  OnNotifySearchResult(searchResult: any): void {
    this.products = searchResult;
  }



}