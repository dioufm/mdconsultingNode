import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Gallery, GalleryItem, ImageItem } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { AuthenticationService } from '../../../services/authentication.service';
import { ProductService } from '../../../services/product.service';
import { environment } from 'src/environments/environment';
import { CategorieService } from '../../../services/categorie.service';
import { Categorie } from '../../../../app/shared/categorie';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../../../../app/shared/product';
import { NgxSpinnerService } from "ngx-spinner";



@Component({
  selector: 'search-product-aside',
  templateUrl: './search-product-aside.component.html',
  styleUrls: ['./search-product-aside.component.css']
})
export class SearchProductAsideComponent implements OnInit {
  name = environment.application.name;
  angular = environment.application.angular;
  bootstrap = environment.application.bootstrap;

  @Input() categorie: Categorie;

  @Input() searchResult: any;
  @Output() notifySearchResult: EventEmitter<any> = new EventEmitter<any>();

  @Input() searchCriteria: Product;
  @Output() notifyFormCriteria: EventEmitter<any> = new EventEmitter<any>();


  productId;
  product = {};

  loading = false;
  error = null;


  categories = [];
  categoriesFilterResult: Array<any> = [];

  sousCategoriesFilterResult: Array<any> = [];

  typesFilterResult: Array<any> = [];


  searchProductAsideForm: FormGroup;



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

    this.searchProductAsideForm = this.fb.group({
      prixMin: ['', []],
      prixMax: ['', []]
    }, {});

    //grouped categories
    if (this.searchResult != null) {
      let map = new Map();
      let mapCount = new Map();
      this.searchResult.forEach(function (product) {
        if (!map.has(product.categorie.code)) {
          map.set(product.categorie.code, product.categorie);
        }
        if (!mapCount.has(product.categorie.code)) {
          mapCount.set(product.categorie.code, 1);
        } else {
          let count = mapCount.get(product.categorie.code) + 1;
          mapCount.set(product.categorie.code, count);
        }
      });

      for (let key of map.keys()) {
        let categorie = map.get(key);
        categorie.count = mapCount.get(key);
        this.categoriesFilterResult.push(categorie);
      }

      //grouped sous categories
      let mapSousCategorie = new Map();
      let mapSousCategorieCount = new Map();

      //types
      let mapTypes = new Map();
      let mapTypesCount = new Map();

      this.searchResult.forEach(function (product) {

        //sous categories
        product.categorie.subcategories.forEach(function (subCategorie) {
          if (!mapSousCategorie.has(subCategorie)) {
            mapSousCategorie.set(subCategorie.code, subCategorie);
          }
          if (!mapSousCategorieCount.has(subCategorie.code)) {
            mapSousCategorieCount.set(subCategorie.code, 1);
          } else {
            let count = mapSousCategorieCount.get(subCategorie.code) + 1;
            mapSousCategorieCount.set(subCategorie.code, count);
          }
        });


        product.categorie.types.forEach(function (type) {
          if (!mapTypes.has(type)) {
            mapTypes.set(type.code, type);
          }
          if (!mapTypesCount.has(type.code)) {
            mapTypesCount.set(type.code, 1);
          } else {
            let count = mapTypesCount.get(type.code) + 1;
            mapTypesCount.set(type.code, count);
          }
        });
      });

      //sous categories
      for (let key of mapSousCategorie.keys()) {
        let subcategorie = mapSousCategorie.get(key);
        subcategorie.count = mapSousCategorieCount.get(key);
        this.sousCategoriesFilterResult.push(subcategorie);
      }

      //types
      for (let key of mapTypes.keys()) {
        let type = mapTypes.get(key);
        type.count = mapTypesCount.get(key);
        this.typesFilterResult.push(type);
      }
    }


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
    this.searchCriteria = new Product(this.searchProductAsideForm.value);
    this.productService.getProductsByCriteria(this.searchCriteria)
      .subscribe(
        data => {
          //this.products = data;
          this.searchCallBack(data);
        },
        error => {
          this.error = error;
          this.loading = false;
        });

    /*this.spinnerService.show();
    this.searchService.search(this.searchCriteria).pipe(takeUntil(this.unsubscribe)).subscribe(
      (res: any) => {
        this.searchCallBack(res);
        this.spinnerService.hide();
      },
      (res: HttpErrorResponse) => {
  
        this.spinnerService.hide();
      },
      () => {
        this.spinnerService.hide();
      }
    );
    */
  }

  /**
  * search CallBack and export is disabled
  * @param res 
  */
  searchCallBack(res: any) {
    this.searchResult = res;
    //this.searchResult.buttonMoreDisable = this.searchResult.caseSearchResults.length < this.searchPageLength;
    this.notifySearchResult.emit(this.searchResult);
    this.spinner.hide();

  }

  onFilterCategorieChange(categorieCode) {
    this.spinner.show();
    this.searchCriteria = new Product(this.searchProductAsideForm.value);
    this.searchCriteria.categorieProduct = categorieCode;
    this.productService.getProductsByCriteria(this.searchCriteria)
      .subscribe(
        data => {
          //this.products = data;
          this.searchCallBack(data);
        },
        error => {
          this.error = error;
          this.loading = false;
        });

  }


  OnNotifySearchResult(searchResult: any): void {
    this.searchResult = searchResult;
  }

  getClass(categorie) {
    if (categorie != null) {
      return 'card ' + categorie.color;
    } else {
      return 'card'
    }
  }
}
