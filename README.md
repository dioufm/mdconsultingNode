# Angular8MeanstackAngularMaterial

Step by step article on [Angular 8 MEAN Stack Tutorial – Build CRUD App with Angular Material 8](https://www.positronx.io/angular-8-mean-stack-tutorial-build-crud-angular-material/)

## How to run the app?
- Run `npm install` to install required dependencies.
- Run `ng serve` to run the angular app
- Start the MEAN Stack backend
  - `cd backend` to enter into the backend folder
  - `nodemon server` to start the nodemon server
  - `mongod` to start the mongoDB shell

  
  
  cd backend
  node app.js
  
    this.userForm.controls.user_name = "mamad.diouf@gmail.com";
    this.userForm.controls.user_password.value = "password";
	
Modif style : fond ecran appplication
style.css :
body {
  height: 100%;
  background-color: #fff;
}

style liens :
argon-design-system
@media (min-width: 768px) {
  .navbar-transparent .navbar-nav .nav-link {
    color: #000;
  }
  
  
ALl buttons :
<div class="modal-header">
  <h5 class="text-primary modal-title">
    <span>Choisissez la catégorie</span>
  </h5>
  <button type="button" (click)="close()" class="close" data-dismiss="modal" aria-hidden="true">
    <i class="fa fa-close"></i>
  </button>
</div>
<div class="modal-body center ">
  <div class="container" *ngIf="!stepCreateProduct">
    <h2 class="md-1 mb-1 text-primary">
      <span>{{categorie.name}}</span>
    </h2>
    <div class="tab-content mb-3">
      <div class="row" *ngFor="let sub of categorie.subcategories">
        <label class="btn btn-secondary">
          <input class="md-3" type="radio" name="{{sub.name}}" id="{{sub.name}}" (click)="selectSubCategorie(sub)">
          <i class=" fas {{sub.icon}} text-primary"></i>
          {{sub.name}}
        </label>
      </div>

    </div>
  </div>
  <div class="container" *ngIf="stepCreateProduct">
    <h2 class="md-1 mb-1 text-primary">
      <span>{{categorie.name}} : {{subCategorieSelected.name}}</span>
    </h2>
    <form action="/action_page.php">
      <div class="custom-control custom-checkbox mb-3">
        <input type="checkbox" class="custom-control-input" id="customCheck" name="example1">
        <label class="custom-control-label" for="customCheck">Custom checkbox</label>
      </div>

      <div class="custom-control custom-radio custom-control-inline">
        <input type="radio" class="custom-control-input" id="customRadio" name="example" value="customEx">
        <label class="custom-control-label" for="customRadio">Custom radio 1</label>
      </div>
      <div class="custom-control custom-radio custom-control-inline">
        <input type="radio" class="custom-control-input" id="customRadio2" name="example" value="customEx">
        <label class="custom-control-label" for="customRadio2">Custom radio 2</label>
      </div>
      <div>
        <select name="cars" class="custom-select mb-3">
          <option selected>Custom Select Menu</option>
          <option value="volvo">Volvo</option>
          <option value="fiat">Fiat</option>
          <option value="audi">Audi</option>
        </select>
      </div>
      <div class="row text-center">

        <label for="default" class="btn btn-default">Default <input type="checkbox" id="default" class="badgebox"><span
            class="badge">check</span></label>
        <label for="primary" class="btn btn-primary">Primary <input type="checkbox" id="primary" class="badgebox"><span
            class="badge">check</span></label>
        <label for="info" class="btn btn-info">Info <input type="checkbox" id="info" class="badgebox"><span
            class="badge">check</span></label>
        <label for="success" class="btn btn-success">Success <input type="checkbox" id="success" class="badgebox"><span
            class="badge">check</span></label>
        <label for="warning" class="btn btn-warning">Warning <input type="checkbox" id="warning" class="badgebox"><span
            class="badge">check</span></label>
        <label for="danger" class="btn btn-danger">Danger <input type="checkbox" id="danger" class="badgebox"><span
            class="badge">check</span></label>
      </div>

    </form>

    ========================
    <div class="container">
      <h2>Checkboxes</h2>
      <form role="form">
        <div class="row">
          <div class="col-md-4">
            <fieldset>
              <legend>
                Basic
              </legend>
              <p>
                Supports bootstrap brand colors: <code>.checkbox-primary</code>, <code>.checkbox-info</code> etc.
              </p>
              <div class="checkbox">
                <input id="checkbox1" type="checkbox">
                <label for="checkbox1">
                  Default
                </label>
              </div>
              <div class="checkbox checkbox-primary">
                <input id="checkbox2" type="checkbox" checked="">
                <label for="checkbox2">
                  Primary
                </label>
              </div>
              <div class="checkbox checkbox-success">
                <input id="checkbox3" type="checkbox">
                <label for="checkbox3">
                  Success
                </label>
              </div>
              <div class="checkbox checkbox-info">
                <input id="checkbox4" type="checkbox">
                <label for="checkbox4">
                  Info
                </label>
              </div>
              <div class="checkbox checkbox-warning">
                <input id="checkbox5" type="checkbox" checked="">
                <label for="checkbox5">
                  Warning
                </label>
              </div>
              <div class="checkbox checkbox-danger">
                <input id="checkbox6" type="checkbox" checked="">
                <label for="checkbox6">
                  Check me out
                </label>
              </div>
              <p>Inline checkboxes</p>
              <div class="checkbox checkbox-inline">
                <input type="checkbox" id="inlineCheckbox1" value="option1">
                <label for="inlineCheckbox1"> Inline One </label>
              </div>
              <div class="checkbox checkbox-success checkbox-inline">
                <input type="checkbox" id="inlineCheckbox2" value="option1" checked="">
                <label for="inlineCheckbox2"> Inline Two </label>
              </div>
              <div class="checkbox checkbox-inline">
                <input type="checkbox" id="inlineCheckbox3" value="option1">
                <label for="inlineCheckbox3"> Inline Three </label>
              </div>
            </fieldset>
          </div>
          <div class="col-md-4">
            <fieldset>
              <legend>
                Circled
              </legend>
              <p>
                <code>.checkbox-circle</code> for roundness.
              </p>
              <div class="checkbox checkbox-circle">
                <input id="checkbox7" type="checkbox">
                <label for="checkbox7">
                  Simply Rounded
                </label>
              </div>
              <div class="checkbox checkbox-info checkbox-circle">
                <input id="checkbox8" type="checkbox" checked="">
                <label for="checkbox8">
                  Me too
                </label>
              </div>
            </fieldset>
          </div>
          <div class="col-md-4">
            <fieldset>
              <legend>
                Disabled
              </legend>
              <p>
                Disabled state also supported.
              </p>
              <div class="checkbox">
                <input id="checkbox9" type="checkbox" disabled="">
                <label for="checkbox9">
                  Can't check this
                </label>
              </div>
              <div class="checkbox checkbox-success">
                <input id="checkbox10" type="checkbox" disabled="" checked="">
                <label for="checkbox10">
                  This too
                </label>
              </div>
              <div class="checkbox checkbox-warning checkbox-circle">
                <input id="checkbox11" type="checkbox" disabled="" checked="">
                <label for="checkbox11">
                  And this
                </label>
              </div>
            </fieldset>
          </div>
        </div>
      </form>
      <h2>Radios</h2>
      <form role="form">
        <div class="row">
          <div class="col-md-4">
            <fieldset>
              <legend>
                Basic
              </legend>
              <p>
                Supports bootstrap brand colors: <code>.radio-primary</code>, <code>.radio-danger</code> etc.
              </p>
              <div class="row">
                <div class="col-sm-6">
                  <div class="radio">
                    <input type="radio" name="radio1" id="radio1" value="option1" checked="">
                    <label for="radio1">
                      Small
                    </label>
                  </div>
                  <div class="radio">
                    <input type="radio" name="radio1" id="radio2" value="option2">
                    <label for="radio2">
                      Big
                    </label>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="radio radio-danger">
                    <input type="radio" name="radio2" id="radio3" value="option1">
                    <label for="radio3">
                      Next
                    </label>
                  </div>
                  <div class="radio radio-danger">
                    <input type="radio" name="radio2" id="radio4" value="option2" checked="">
                    <label for="radio4">
                      One
                    </label>
                  </div>
                </div>
              </div>
              <p>Inline radios</p>
              <div class="radio radio-info radio-inline">
                <input type="radio" id="inlineRadio1" value="option1" name="radioInline" checked="">
                <label for="inlineRadio1"> Inline One </label>
              </div>
              <div class="radio radio-inline">
                <input type="radio" id="inlineRadio2" value="option1" name="radioInline">
                <label for="inlineRadio2"> Inline Two </label>
              </div>
            </fieldset>
          </div>
          <div class="col-md-4">
            <fieldset>
              <legend>
                Disabled
              </legend>
              <p>
                Disabled state also supported.
              </p>
              <div class="radio radio-danger">
                <input type="radio" name="radio3" id="radio5" value="option1" disabled="">
                <label for="radio5">
                  Next
                </label>
              </div>
              <div class="radio">
                <input type="radio" name="radio3" id="radio6" value="option2" checked="" disabled="">
                <label for="radio6">
                  One
                </label>
              </div>
            </fieldset>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- Buttons  -->
<div class="modal-footer" *ngIf="!stepCreateProduct">
  <button class="btn btn-primary" type="button" [disabled]="subCategorieSelected==null"
    (click)="nextStep()">Suivant</button>
</div>

<div class="modal-footer" *ngIf="stepCreateProduct">
  <button class="btn btn-default" *ngIf="stepCreateProduct" type="button" [disabled]="subCategorieSelected==null"
    (click)="nextStep()">Précedent</button>
  <button class="btn btn-primary" type="button" [disabled]="subCategorieSelected==null"
    (click)="nextStep()">Suivant</button>
</div>