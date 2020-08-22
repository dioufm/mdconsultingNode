import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Gallery, GalleryItem, ImageItem } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { AuthenticationService } from '../../../services/authentication.service';
import { ProductService } from '../../../services/product.service';
import { environment } from 'src/environments/environment';
import { CategorieService } from '../../../services/categorie.service';
import { Categorie } from '../../../shared/categorie';
import { Product } from 'src/app/shared/product';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";



@Component({
  selector: 'search-product-header',
  templateUrl: './search-product-header.component.html',
  styleUrls: ['./search-product-header.component.css']
})
export class SearchProductHeaderComponent implements OnInit {
  name = environment.application.name;
  angular = environment.application.angular;
  bootstrap = environment.application.bootstrap;

  @Input() categorie: Categorie;

  @Input() subCategorie: any;
  @Output() notifySubCategorie: EventEmitter<any> = new EventEmitter<any>();

  @Input() searchResult: any;
  @Output() notifySearchResult: EventEmitter<any> = new EventEmitter<any>();

  @Input() searchCriteria: Product;
  @Output() notifyFormCriteria: EventEmitter<any> = new EventEmitter<any>();


  loading = false;
  error = null;

  categories = [];

  searchProductHeaderForm: FormGroup;



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
    private fb: FormBuilder,
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

    this.categorieService.getAllCategories()
      .subscribe(
        data => {
          this.categories = data;
        },
        error => {
          this.error = error;
        });


    this.searchProductHeaderForm = this.fb.group({
      productName: ['', []],
      categorieProduct: ['', []]
    }, {});

  }

  /**
    * search from home page 
    */
  search() {
    //this.searchCriteria.offset = 0;
    this.loadSearchData();

  }

  /**
 * load Search Data : button search
 */
  loadSearchData() {
    this.spinner.show();
    this.searchCriteria = new Product(this.searchProductHeaderForm.value);
    this.productService.getProductsByCriteria(this.searchCriteria)
      .subscribe(
        data => {
          this.searchCallBack(data);
        },
        error => {
          this.error = error;
          this.loading = false;
        });

  }

  /**
  * search CallBack and export is disabled
  * @param res 
  */
  searchCallBack(res: any) {
    this.searchResult = res;
    this.notifySearchResult.emit(this.searchResult);
    this.spinner.hide();

  }


  OnNotifySearchResult(searchResult: any): void {
    this.searchResult = searchResult;
  }

  changeSubCategorie(subCategorie) {
    this.searchCriteria = new Product();
    this.searchCriteria.subCategorieProduct = subCategorie.code;
    this.productService.getProductsByCriteria(this.searchCriteria)
      .subscribe(
        data => {
          this.searchCallBack(data);
        },
        error => {
          this.error = error;
          this.loading = false;
        });

    this.subCategorie = subCategorie;
    this.notifySubCategorie.emit(this.subCategorie);

  }

  OnNotifySubCategorie(subCategorie: any): void {
    this.subCategorie = subCategorie;
  }

}
