import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../../../services/authentication.service';
import { ProductService } from '../../../../services/product.service';
import { User } from '../../../../shared/user';
import { CategorieService } from '../../../../services/categorie.service';
import { Categorie } from '../../../../shared/categorie';
import { SubCategorie } from 'src/app/shared/subcategorie';


@Component({
  selector: 'app-admin-view-categorie',
  templateUrl: './admin-view-categorie.component.html',
  styleUrls: ['./admin-view-categorie.component.css']
})
export class AdminViewCategorieComponent implements OnInit {

  @Input() categorie;

  categorieForm: FormGroup;

  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  message = '';

  login = true;
  signup = false;

  user: User;

  currentUser: User;

  subscription: Subscription;

  categorieId;

  isChangePassword = false;


  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private productService: ProductService,
    private categorieService: CategorieService) {

  }

  ngOnInit() {
    this.categorieId = this.route.snapshot.paramMap.get("categorieId");
    if (this.categorieId != 'newCategorie') {
      this.categorieService.getCategorieById(this.categorieId)
        .subscribe(
          data => {
            this.categorie = data;

            this.initRowsSubcategories();
            this.initRowsTypes();
            this.categorieForm.patchValue(this.categorie);
          },
          error => {
            this.error = error;
            this.loading = false;
          });
    }
    this.categorieForm = this.fb.group({
      _id: ['', []],
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      level: ['', [Validators.required]],
      color: ['', [Validators.required]],
      icon: ['', [Validators.required]],
      subcategories: this.fb.array([]),
      types: this.fb.array([])


    });


  }
  initRowsSubcategories() {
    if (this.categorie != null && this.categorie.subcategories != null) {
      this.categorie.subcategories.forEach(element => {
        this.formArr.push(this.fb.group(new SubCategorie(element)))
      });
    }
  }

  initRowsTypes() {
    if (this.categorie != null && this.categorie.types != null) {
      this.categorie.types.forEach(element => {
        this.formArrTypes.push(this.fb.group(new SubCategorie(element)))
      });
    }
  }

  addRow() {
    return this.fb.group({
      code: [""],
      name: [""],
      level: [""]
    });
  }

  addNewTypeRow() {
    return this.fb.group({
      code: [""],
      name: [""],
      icon: [""]
    });
  }


  get formArr() {
    return this.categorieForm.get("subcategories") as FormArray;
  }

  get formArrTypes() {
    return this.categorieForm.get("types") as FormArray;
  }

  addNewRow() {
    this.formArr.push(this.addRow());
  }

  addNewType() {
    this.formArrTypes.push(this.addNewTypeRow());
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }

  deleteRowType(index: number) {
    this.formArrTypes.removeAt(index);
  }

  // convenience getter for easy access to form fields
  get f() { return this.categorieForm.controls; }


  validateCategorie() {
    if (this.categorieForm.valid) {
      this.categorie = new Categorie(this.categorieForm.value);
      this.categorieService.updateCategorie(this.categorie)
        .pipe(first())
        .subscribe(
          data => {

            if (data != null) {
              this.toastr.success('Categorie mise à jour avec succes.');
            } else {
              this.toastr.error('une erreur est présente. Merci de reesayer.');
            }

          },
          error => {
            this.message = error;
            this.error = error;
            this.loading = false;
          });

    }
  }


  addNewCategorie() {
    if (this.categorieForm.valid) {
      this.categorie = new Categorie(this.categorieForm.value);
      this.categorieService.addNewCategorie(this.categorie)
        .pipe(first())
        .subscribe(
          data => {

            if (data != null) {
              this.toastr.success('Categorie mise à jour avec succes.');
            } else {
              this.toastr.error('une erreur est présente. Merci de reesayer.');
            }

          },
          error => {
            this.message = error;
            this.error = error;
            this.loading = false;
          });

    }
  }

  public displayFieldCss(field, type) {

    return 'btn-sm btn-secondary'


  }
}



