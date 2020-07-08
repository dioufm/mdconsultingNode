import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { BsModalRef } from 'ngx-bootstrap';
import { Product } from '../../../shared/product';
import { User } from '../../../shared/user';





@Component({
  selector: 'app-subproduct',
  templateUrl: './subproduct.component.html',
  styleUrls: ['./subproduct.component.css']
})
export class SubProductComponent implements OnInit {

  categorie: any;
  subCategories: any;

  subCategorieSelected = null;

  stepMessage;

  constructor(
    private router: Router,
    public bsModalRef: BsModalRef) {

  }

  ngOnInit() {

    this.stepMessage = 'Choisissez la sous catégorie';

    localStorage.setItem('currentCategorie', JSON.stringify(this.categorie));
  }


  public selectSubCategorie(subCategorie) {
    this.subCategorieSelected = subCategorie;
    let subCategorieCode = this.subCategorieSelected.code;
    localStorage.setItem('currentSubCategorie', JSON.stringify(this.subCategorieSelected));
    this.router.navigate(['annonce'], { queryParams: { categorieCode: this.categorie.code, subCategorieCode: subCategorieCode } });
    this.bsModalRef.hide();
  }


  public close() {
    this.router.navigate(['createproduct'], {});
    this.bsModalRef.hide();

  }

}



