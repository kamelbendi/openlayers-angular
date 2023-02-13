//import { SchemaMetadata } from '@angular/compiler';
import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
//import products from './mock/products';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  
  
})
export class ProductComponent {
  @Input() product: string;
  
  //products = products;
  constructor() {
    this.product='w'
  }
  
  ngOnInit(): void {}
}


