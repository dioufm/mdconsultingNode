import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Gallery, GalleryItem, ImageItem } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { AuthenticationService } from '../../../services/authentication.service';
import { ProductService } from '../../../services/product.service';
import { environment } from 'src/environments/environment';
import { CategorieService } from '../../../services/categorie.service';



@Component({
  selector: 'search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {
  name = environment.application.name;
  angular = environment.application.angular;
  bootstrap = environment.application.bootstrap;

  productId;
  product = {};

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
  }



}
