import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
import { OrderPipe } from "ngx-order-pipe";

@Component({
  selector: 'app-productresult',
  templateUrl: './productresult.component.html',
  styleUrls: ['./productresult.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ProductResultComponent implements OnInit {
  name = environment.application.name;
  angular = environment.application.angular;
  bootstrap = environment.application.bootstrap;

  form: any = {};
  report: any;
  currentUser: any;

  @Input() products;


  loading = false;
  error = null;

  order: string = "dateCreation";
  reverse: boolean = false;


  constructor(
    private spinner: NgxSpinnerService,
    private orderPipe: OrderPipe
  ) {

  }

  ngOnInit() {


  }

  setOrder(value: string) {
    this.spinner.show();
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
    this.spinner.hide();

  }

}