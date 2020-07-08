import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap';
import { ProductService } from 'src/app/services/product.service';
import { SubProductComponent } from './subproduct/subproduct.component';
import { ToastrService } from 'ngx-toastr';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.css']
})
export class CreateProductComponent implements OnInit {

  error = '';

  message = '';

  categories = [];

  bsModalRef;

  constructor(
    private router: Router,
    private productService: ProductService,
    private categorieService: CategorieService,
    private toastr: ToastrService,
    private modalService: BsModalService) {


  }

  ngOnInit() {

    this.categorieService.getAllCategories()
      .subscribe(
        data => {
          this.categories = data;
        },
        error => {
          this.error = error;
          this.toastr.error(this.error);
        });

  }


  showCategorieModal(categorie) {
    const initialState = {
      categorie: categorie,
    };
    this.bsModalRef = this.modalService.show(SubProductComponent, { class: 'modal-lg', ignoreBackdropClick: true, initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
  }



}



