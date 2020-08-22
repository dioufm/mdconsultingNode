import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { BsModalRef } from 'ngx-bootstrap';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from '../../../services/authentication.service';
import { ProductService } from '../../../services/product.service';
import { CommonService } from '../../../shared/common.service';
import { Product } from '../../../shared/product';
import { User, Ville, Modele, Marque, BoiteVitesse } from '../../../shared/user';
import { ToastrService } from 'ngx-toastr';






@Component({
  selector: 'app-createannonce',
  templateUrl: './createannonce.component.html',
  styleUrls: ['./createannonce.component.css']
})
export class CreateAnnonceComponent implements OnInit {
  createaAnonceForm: FormGroup;

  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  message = '';

  categorie;

  subCategories = {};

  subCategorie;

  stepFinalValidation = false;
  stepCreateProduct = false;
  stepAddPicture = false;
  stepLogin = false;
  stepMessage;

  country: any;
  regionSelected = null;
  departementSelected = null;

  //uploader: FileUploader;

  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });

  fileData: File = null;

  previewUrl1: any = null;
  previewUrl2: any = null;
  previewUrl: any = null;

  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  currentUser: User;

  product: Product;

  productId;

  subCategorieCode;

  categorieCode;

  public villes: Ville[];

  public modeles: Modele[];

  public filteredVilles: ReplaySubject<Ville[]> = new ReplaySubject<Ville[]>(1);

  @ViewChild('singleSelect') singleSelect: MatSelect;

  public _onDestroy = new Subject<void>();


  public marques: Marque[];

  public filteredMarques: ReplaySubject<Marque[]> = new ReplaySubject<Marque[]>(1);

  public filteredModeles: ReplaySubject<Modele[]> = new ReplaySubject<Modele[]>(1);

  currentMarque: Marque;


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

  constructor(
    private authenticationService: AuthenticationService,
    private productService: ProductService,
    private fb: FormBuilder,
    private commonService: CommonService,
    public bsModalRef: BsModalRef,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.createaAnonceForm = this.fb.group({
      typeOffre: ['VENTE', [Validators.required]],
      newProduct: ['1', [Validators.required]],
      categorieProduct: ['', [Validators.required]],
      subCategorieProduct: ['', [Validators.required]],
      typeProduct: ['', []],

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
      description: ['DESCRIPTION VENTE IMMOBILIER', [Validators.required]],
      prix: ['100000', [Validators.required]],
      ville: ['', [Validators.required]],
      ville2: ['', []],

      //users infos final validation
      user_firstname: ['firstNameTest', []],
      user_name: ['nameTest', []],
      email: ['teste2@teste2.fr', []],
      tel: ['00221584756', []],
      telwhatsapp: ['00221584756', []],
      showTel: ['0', []],
      showTelWhatsapp: ['0', []]

    }, {});



    this.stepMessage = 'Decrivez votre bien !';

    this.stepCreateProduct = true;
    this.stepFinalValidation = false;
    this.stepAddPicture = false;
    this.stepLogin = false;

    this.currentUser = this.authenticationService.currentUserValue;

    this.commonService.getLoginEventCreatingProduct()
      .subscribe(loginCreateProductEvent => {
        if (loginCreateProductEvent) {
          this.currentUser = this.authenticationService.currentUserValue;
          this.gotoLogin();
        }
      });


    if (localStorage.getItem('currentCategorie') != null) {
      this.categorie = JSON.parse(localStorage.getItem('currentCategorie'));
    }
    if (localStorage.getItem('currentSubCategorie') != null) {
      this.subCategorie = JSON.parse(localStorage.getItem('currentSubCategorie'));
    }

    this.activatedRoute.queryParams.subscribe((params) => {
      this.categorieCode = params['categorieCode'];
      this.subCategorieCode = params['subCategorieCode'];


    });

    this.f['categorieProduct'].setValue(this.categorieCode);
    this.f['subCategorieProduct'].setValue(this.subCategorieCode);

    if (this.currentUser != null) {
      this.f['user_name'].setValue(this.currentUser.username);
      this.f['email'].setValue(this.currentUser.email);
      this.f['user_firstname'].setValue(this.currentUser.firstname);
      this.f['tel'].setValue(this.currentUser.tel);
      this.f['telwhatsapp'].setValue(this.currentUser.telwhatsapp);
    }



    this.productService.getCountry()
      .subscribe(
        data => {
          //this.categories = data;
          this.country = data;
          this.villes = data.villes
          let filter = this.villes.filter(ville => ville.code.toLowerCase().indexOf(this.f['ville'].value) > -1);
          if (filter.length > 0) {
            this.f['ville'].setValue(filter[0].code);
            this.f['ville2'].setValue(null);
          }

        },
        error => {
          this.error = error;
          this.loading = false;
        });

    if (this.categorieCode == 'VEH') {
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
    }



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

  public gotoLogin() {

    // stop here if form is invalid
    if (this.createaAnonceForm.valid) {
      if (this.currentUser != null) {

        this.validateCreateProduct(this.currentUser);

        this.stepLogin = false;
        this.stepAddPicture = true;
        this.stepFinalValidation = false;
        this.stepCreateProduct = false;
        this.stepMessage = 'Ajouter des photos?';
      } else {
        this.stepLogin = true;
        this.stepFinalValidation = false;
        this.stepCreateProduct = false;
        this.stepAddPicture = false;
        this.stepMessage = 'Connexion';
      }
    } else {
      return;
    }

  }

  public validateCreateProduct(user) {
    if (this.createaAnonceForm.valid) {
      //create a product
      this.product = new Product(this.createaAnonceForm.value);
      let filter = this.villes.filter(ville => ville.code.toLowerCase().indexOf(this.f['ville'].value.toLowerCase()) > -1);
      if (filter.length > 0) {
        this.product.villeName = filter[0].name;
      }

      this.productService.createProduct(this.product, user.id)
        .subscribe(
          data => {
            this.message = data;

            if (data.product._id != null) {
              this.product._id = data.product._id;
              this.uploader = this.productService.addPicture(data.product._id);
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

  public gotoStepCreateProduct() {

    this.stepCreateProduct = true;
    this.stepAddPicture = false;
    this.stepLogin = false;
    this.stepMessage = 'Decrivez votre bien !';

  }

  public gotoAddPicture() {

    // stop here if form is invalid
    if (this.createaAnonceForm.invalid) {
      return;
    }
    this.stepFinalValidation = false;
    this.stepCreateProduct = false;
    this.stepAddPicture = true;
    this.stepLogin = false;
    this.stepMessage = 'Ajouter des photos?';

  }
  public addPicture() {
    this.uploader.uploadAll();

    this.stepFinalValidation = true;
    this.stepCreateProduct = false;
    this.stepAddPicture = false;
    this.stepLogin = false;
    this.stepMessage = 'Contact vendeur';
  }
}



