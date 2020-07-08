import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Gallery, GalleryItem, ImageItem } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../../../services/authentication.service';
import { CategorieService } from '../../../services/categorie.service';
import { ProductService } from '../../../services/product.service';
import { UserService } from '../../../services/user.service';
import { Product } from '../../../shared/product';
import { ToastrService } from 'ngx-toastr';

import { Marque, Modele, BoiteVitesse, Ville, User } from 'src/app/shared/user';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material';
import { takeUntil } from 'rxjs/operators';




@Component({
  selector: 'user-product',
  templateUrl: './user-product.component.html',
  styleUrls: ['./user-product.component.css']
})
export class UserProductComponent implements OnInit {
  name = environment.application.name;
  angular = environment.application.angular;
  bootstrap = environment.application.bootstrap;

  productId;
  product: any;

  loading = false;
  error = null;
  message = '';

  photos: GalleryItem[];

  breadcrumbList: Array<any> = [];
  index = 0;

  ifShowTel = false;

  createaAnonceForm: FormGroup;

  categorie: any;

  public marques: Marque[];

  public filteredMarques: ReplaySubject<Marque[]> = new ReplaySubject<Marque[]>(1);

  public filteredModeles: ReplaySubject<Modele[]> = new ReplaySubject<Modele[]>(1);

  currentMarque: Marque;

  public villes: Ville[];

  public modeles: Modele[];

  public filteredVilles: ReplaySubject<Ville[]> = new ReplaySubject<Ville[]>(1);

  @ViewChild('singleSelect') singleSelect: MatSelect;

  public _onDestroy = new Subject<void>();

  currentUser: User;

  user: User;



  public boiteVitesses: BoiteVitesse[] = [
    { code: 'MANU', name: 'Manuelle', icon: 'boite_vitesse_manuelle' },
    { code: 'AUTO', name: 'Automatique', icon: 'boite_vitesse_automatique' }
  ];

  public carburants: BoiteVitesse[] = [
    { code: 'ESS', name: 'Essence', icon: 'essence_icon' },
    { code: 'DSL', name: 'Diesel', icon: 'diesel_icon' }
  ];

  public places: BoiteVitesse[] = [
    { code: '2', name: '', icon: 'two_icon' },
    { code: '4', name: '', icon: 'four_icon' },
    { code: '5', name: '', icon: 'five_icon' },
    { code: '7', name: '', icon: 'seven_icon' }
  ];

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  constructor(
    private meta: Meta,
    private titleService: Title,
    private router: Router,
    private authenticationService: AuthenticationService,
    private productService: ProductService,
    private categorieService: CategorieService,
    private userService: UserService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private fb: FormBuilder,
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

    this.productId = this.route.snapshot.paramMap.get("productId");

    this.productService.getProductById(this.productId)
      .subscribe(
        data => {
          this.product = data;
          this.createaAnonceForm.patchValue(this.product);
          this.f['typeProduct'].setValue(this.product.categorie.types[0].code);
          this.f['ville'].setValue(this.product.ville);
          this.f['ville2'].setValue(this.product.ville);

          this.f['categorieProduct'].setValue(this.product.categorie.code);
          this.f['subCategorieProduct'].setValue(this.product.categorie.subcategories[0].code);

          this.authenticationService.currentUser.subscribe(data => {
            this.currentUser = data;
            if (this.currentUser != null) {
              this.userService.getUserBuyUserId(this.currentUser.id)
                .subscribe(
                  data => {
                    this.user = data.user;
                    this.f['user_name'].setValue(this.user.username);
                    this.f['email'].setValue(this.user.email);

                    this.f['user_firstname'].setValue(this.user.firstname);
                    this.f['tel'].setValue(this.user.tel);
                    this.f['telwhatsapp'].setValue(this.user.telwhatsapp);

                  },
                  error => {
                    this.error = error;
                    this.loading = false;
                  });

            }


          });




          this.photos = data.photos.map(item => new ImageItem({ src: item.imageUrl, thumb: item.imageUrl }));

          this.breadcrumbList.push({
            name: 'this.product.categorie.subcategories[0].name',
            path: 'target.path'
          });

          if (this.product != null) {
            this.categorieService.getCategorieByCode(this.product.categorie.code)
              .subscribe(
                data => {
                  this.categorie = data;
                },
                error => {
                  this.error = error;
                  this.loading = false;
                });
          }
        },
        error => {
          this.error = error;
          this.loading = false;
        });

    this.productService.getCountry()
      .subscribe(
        data => {
          //this.categories = data;
          this.villes = data.villes
          let filter = this.villes.filter(ville => ville.code.toLowerCase().indexOf(this.f['ville'].value) > -1);
          if (filter.length > 0) {

          }

        },
        error => {
          this.error = error;
          this.loading = false;
        });

    this.productService.getMarques()
      .subscribe(
        data => {
          this.marques = data;
          let filter = this.marques.filter(marque => marque.marque.toLowerCase().indexOf(this.f['marque'].value) > -1);
          if (filter.length > 0) {
            this.f['marque'].setValue(filter[0].marque);
            this.f['marque2'].setValue(null);

            let filterModeles = filter[0].modeles.filter(modele => modele.name.toLowerCase().indexOf(this.f['modele'].value) > -1);
            if (filterModeles.length > 0) {
              this.f['modele'].setValue(filterModeles[0].name);
              this.f['modele2'].setValue(null);
            }
          }
        },
        error => {
          this.error = error;
          this.loading = false;
        });




    this.createaAnonceForm = this.fb.group({
      _id: ['', [Validators.required]],
      typeOffre: ['', [Validators.required]],
      newProduct: ['', [Validators.required]],
      categorieProduct: ['', [Validators.required]],
      subCategorieProduct: ['', [Validators.required]],
      typeProduct: ['', [Validators.required]],

      // immobilier
      surface: ['', []],
      nbPieces: ['', []],

      //voitures
      marque: ['', []],
      marque2: ['', []],
      modele: ['', []],
      modele2: ['', []],
      km: ['', []],
      boiteVitesse: ['', []],
      carburant: ['', []],
      nbPlaces: ['', []],

      titre: ['', []],
      description: ['', [Validators.required]],
      prix: ['', [Validators.required]],
      ville: ['', [Validators.required]],
      ville2: ['', []],

      //users infos final validation
      user_firstname: ['', [Validators.required]],
      user_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      tel: ['', [Validators.required]],
      telwhatsapp: ['', [Validators.required]],
      showTel: ['', []],
      showTelWhatsapp: ['', []]

    }, {});

    // listen for search field value changes
    this.f['ville2'].valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterVilles();
      });


    this.f['marque2'].valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterMarques(false);
      });

    this.f['modele2'].valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterModeles();
      });


  }

  get f() { return this.createaAnonceForm.controls; }

  public choiceType(field, type) {
    this.f[field].setValue(type);
  }

  public displayFieldCss(field, type) {
    if (this.f[field].value == type) {
      return 'btn-sm btn-primary'
    } else {
      return 'btn-sm btn-secondary'
    }

  }

  public marqueChange() {
    this.filterMarques(true);
  }

  private filterVilles() {
    let search = this.f['ville2'].value;
    if (!this.villes) {
      return;
    }

    if (!search) {
      this.filteredVilles.next(this.villes.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the Villes
    this.filteredVilles.next(
      this.villes.filter(ville => ville.code.toLowerCase().indexOf(search) > -1)
    );
  }

  private filterMarques(select) {
    let search = "";
    if (select) {
      search = this.f['marque'].value;
      this.f['modele'].setValue('');
      this.f['modele2'].setValue('');

    } else {
      search = this.f['marque2'].value;
    }
    if (!this.marques) {
      return;
    }

    if (!search) {
      this.filteredMarques.next(this.marques.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    let filter = this.marques.filter(marque => marque.marque.toLowerCase().indexOf(search) > -1);
    this.filteredMarques.next(
      filter
    );
    if (filter.length > 0) {
      this.currentMarque = filter[0];
      this.modeles = this.currentMarque.modeles;
      this.filteredModeles.next(this.modeles);
    }

  }


  private filterModeles() {

    let search = this.f['modele2'].value;
    if (!this.modeles) {
      return;
    }

    if (!search) {
      this.filteredModeles.next(this.modeles);
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the Villes
    this.filteredModeles.next(
      this.modeles.filter(modele => modele.name.toLowerCase().indexOf(search) > -1)
    );

  }

  public updateProduct() {
    if (this.createaAnonceForm.valid) {
      //create a product
      this.product = new Product(this.createaAnonceForm.value);
      let filter = this.villes.filter(ville => ville.code.toLowerCase().indexOf(this.f['ville'].value.toLowerCase()) > -1);
      if (filter.length > 0) {
        this.product.villeName = filter[0].name;
      }

      this.productService.updateProduct(this.product, this.currentUser.id)
        .subscribe(
          data => {
            this.message = data;

            if (data.product._id != null) {
              this.product._id = data.product._id;
              //this.uploader = this.productService.addPicture(data.product._id);
            }
          },
          error => {
            this.message = error;
            this.error = error;
            this.loading = false;
            this.toastr.error(this.error);
          });

    } else {
      return;
    }

  }
}
