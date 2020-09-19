import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Gallery, GalleryItem, ImageItem } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { AuthenticationService } from '../../../services/authentication.service';
import { ProductService } from '../../../services/product.service';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '../../../../app/shared/user';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from '../../../services/message.service';



@Component({
  selector: 'view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  productId;
  product = {};

  loading = false;
  error = null;

  photos: GalleryItem[];

  breadcrumbList: Array<any> = [];
  index = 0;

  ifShowTel = false;

  ifSendMessage = false;

  productForm: FormGroup;

  currentUser: User;



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
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private messageService: MessageService,
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

    this.currentUser = this.authenticationService.currentUserValue;

    this.productId = this.route.snapshot.paramMap.get("productId");

    this.productService.getProductById(this.productId)
      .subscribe(
        data => {
          this.product = data;
          this.photos = data.photos.map(item => new ImageItem({ src: item.imageUrl, thumb: item.imageUrl }));


          this.breadcrumbList.push({
            name: 'this.product.categorie.subcategories[0].name',
            path: 'target.path'
          });
        },
        error => {
          this.error = error;
          this.loading = false;
        });

    this.productForm = this.fb.group({

      message: ['Bonjour, ce bien est-il toujours disponible ?', [Validators.required]],


    }, {});
  }

  get f() { return this.productForm.controls; }

  showTel() {
    this.ifShowTel = true;
  }

  startSendMessageProduct() {
    if (this.currentUser != null) {
      this.ifSendMessage = true;
    } else {
      this.router.navigate(['/login']);
    }

  }


  sendMessageProduct() {
    if (this.currentUser != null) {
      this.messageService.createMessage(this.f['message'].value, this.currentUser.id, this.productId)
        .subscribe(
          data => {
            if (data != null) {
              this.toastr.success(this.error);
            }
          },
          error => {
            this.error = error;
            this.loading = false;
            this.toastr.error(this.error);
          });
      this.ifSendMessage = false;
    } else {
      this.router.navigate(['/login']);
    }

  }

  sendMessage(message, userId) {



  }

}
