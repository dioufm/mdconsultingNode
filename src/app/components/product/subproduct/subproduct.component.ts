import { Component, OnInit, NgZone } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { AuthenticationService } from '../../../services/authentication.service';
import { ProductService } from '../../../services/product.service';
import { FileUploader } from 'ng2-file-upload';



@Component({
  selector: 'app-subproduct',
  templateUrl: './subproduct.component.html',
  styleUrls: ['./subproduct.component.css']
})
export class SubProductComponent implements OnInit {
  subProductForm: FormGroup;

  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  message = '';

  categorie = {};
  subCategories = {};

  subCategorieSelected = null;


  stepSelectSubCategorie = false;
  stepCreateProduct = false;
  stepAddPicture = false;
  stepLogin = false;
  stepMessage;

  country: any;
  regionSelected = null;
  departementSelected = null;
  ville = null;

  uploader: FileUploader;

  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;



  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private productService: ProductService,
    private fb: FormBuilder,
    public bsModalRef: BsModalRef) {


  }

  ngOnInit() {
    this.subProductForm = this.fb.group({
      typeOffre: ['VENTE', [Validators.required]],
      typeProduct: ['MAI', []],
      surface: ['', [Validators.required]],
      nbPieces: ['', [Validators.required]],
      titre: ['', [Validators.required]],
      description: ['', [Validators.required]],
      prix: ['', [Validators.required]],
      region: ['', [Validators.required]],
      departement: ['', [Validators.required]],
      ville: ['', [Validators.required]]

    }, {});
    this.stepMessage = 'Choisissez la sous catégorie';

    this.stepSelectSubCategorie = false;
    this.stepCreateProduct = false;
    this.stepAddPicture = false;
    this.stepLogin = true;

    this.productService.getCountry()
      .subscribe(
        data => {
          //this.categories = data;
          this.country = data;
        },
        error => {
          this.error = error;
          this.loading = false;
        });

    this.uploader = this.productService.addPicture();
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }

  get f() { return this.subProductForm.controls; }

  /* Submit book */
  submitsubproductForm() {
    if (this.subProductForm.valid) {
      /*
      this.authenticationService.subproduct(this.f.user_email.value, this.f.user_password.value)
        .pipe(first())
        .subscribe(
          data => {
            this.commonService.setsubproductEvent(true);
            this.router.navigateByUrl('/');
          },
          error => {
            this.message = error;
            this.error = error;
            this.loading = false;
          });
      /*
      this.authenticationService.subproduct(this.subProductForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/'))
      });
      */
    }
  }

  public selectSubCategorie(subCategorie) {
    this.stepMessage = 'Décrivez votre bien !';

    this.stepSelectSubCategorie = false;
    this.stepCreateProduct = true;
    this.stepAddPicture = false;
    this.stepLogin = false;

    this.subCategorieSelected = subCategorie;
  }

  public choiceType(type) {
    this.f['typeProduct'].setValue(type);
  }

  public displayFieldCss(type) {
    if (this.f['typeProduct'].value == type) {
      return 'btn-sm btn-primary'
    } else {
      return 'btn-sm btn-secondary'
    }

  }

  gotoStepCreateProduct(subCategorie) {

    this.stepSelectSubCategorie = false;
    this.stepCreateProduct = true;
    this.stepAddPicture = false;
    this.stepLogin = false;

    this.subCategorieSelected = subCategorie;
    this.stepMessage = 'Choisissez la sous catégorie';
  }

  gotoSelectSubcategories() {

    this.stepSelectSubCategorie = true;
    this.stepCreateProduct = false;
    this.stepAddPicture = false;
    this.stepLogin = false;

    this.subCategorieSelected = null;
    this.stepMessage = 'Choisissez la sous catégorie';
  }


  public gotoLogin() {

    // stop here if form is invalid
    if (this.subProductForm.invalid) {
      return;
    }
    this.stepLogin = true;
    this.stepSelectSubCategorie = false;
    this.stepCreateProduct = false;
    this.stepAddPicture = false;
    this.stepMessage = 'Ajouter des photos?';

  }

  public gotoAddPicture() {

    // stop here if form is invalid
    if (this.subProductForm.invalid) {
      return;
    }
    this.stepSelectSubCategorie = false;
    this.stepCreateProduct = false;
    this.stepAddPicture = true;
    this.stepLogin = false;
    this.stepMessage = 'Ajouter des photos?';

  }
  public addPicture() {

    // stop here if form is invalid
    if (this.subProductForm.invalid) {
      return;
    }
    this.stepSelectSubCategorie = false;
    this.stepCreateProduct = false;
    this.stepAddPicture = true;
    this.stepMessage = 'Ajouter des photos?';
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
      alert('File uploaded successfully');
    };
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.subProductForm.controls[controlName].hasError(errorName);
  }

  selectRegion(regionCode) {
    let regionSelec;
    this.country.regions.forEach(function (region) {
      if (regionCode == region.code) {
        regionSelec = region;
      }
    });
    this.regionSelected = regionSelec;
  }

  selectDepartement(departement) {
    let departementSelec;
    this.regionSelected.departements.forEach(function (dep) {
      if (departement == dep.code) {
        departementSelec = dep;
      }
    });

    this.departementSelected = departementSelec;
  }

  selectVille(ville) {
    this.ville = ville
  }

  public close() {
    this.bsModalRef.hide();
  }




}



