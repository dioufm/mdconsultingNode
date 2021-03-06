import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Gallery, GalleryItem, ImageItem } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { AuthenticationService } from '../../../services/authentication.service';
import { ProductService } from '../../../services/product.service';
import { environment } from 'src/environments/environment';
import { CategorieService } from '../../../services/categorie.service';
import { Categorie } from 'src/app/shared/categorie';
import { Product } from 'src/app/shared/product';
import { NgxSpinnerService } from "ngx-spinner";



@Component({
  selector: 'search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductCategorieComponent implements OnInit {
  name = environment.application.name;
  angular = environment.application.angular;
  bootstrap = environment.application.bootstrap;

  @Input() searchResult: any;
  @Output() notifySearchResult: EventEmitter<any> = new EventEmitter<any>();

  @Input() searchCriteria: Product;
  @Output() notifyFormCriteria: EventEmitter<any> = new EventEmitter<any>();

  @Input() subCategorie: any;
  @Output() notifySubCategorie: EventEmitter<any> = new EventEmitter<any>();

  categorieCode;
  subcategorieCode;
  typeCode

  categorie: Categorie;


  products = [];

  criteriaSearchProduct: Product;

  loading = false;
  error = null;

  photos: GalleryItem[];

  breadcrumbList: Array<any> = [];
  index = 0;

  ifShowTel = false;
  categories = [];



  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  constructor(
    private meta: Meta,
    private titleService: Title,
    private router: Router,
    private authenticationService: AuthenticationService,
    private categorieService: CategorieService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    public gallery: Gallery, public lightbox: Lightbox) {

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

    this.route.params.subscribe((params) => {
      this.categorieCode = params['categorie'];
    });

    this.route.params.subscribe((params) => {
      this.subcategorieCode = params['subcategorie'];
    });

    this.route.params.subscribe((params) => {
      this.typeCode = params['type'];
    });

    if (this.categorieCode != null) {
      this.spinner.show();
      this.categorieService.getCategorieByCode(this.categorieCode)
        .subscribe(
          data => {
            this.categorie = data;
            if (this.subcategorieCode != null && this.categorie != null) {
              let subcategories = this.categorie.subcategories.filter(subCat => subCat.code == this.subcategorieCode);
              this.subCategorie = subcategories != null ? subcategories[0] : null;
            }
          },
          error => {
            this.error = error;
            this.loading = false;
          });

    }

    this.criteriaSearchProduct = new Product();

    this.criteriaSearchProduct.categorieProduct = this.categorieCode;
    this.criteriaSearchProduct.subCategorieProduct = this.subcategorieCode;
    this.criteriaSearchProduct.typeProduct = this.typeCode;
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

  OnNotifySubCategorie(subCategorie: any): void {
    this.subCategorie = subCategorie;
  }


}

