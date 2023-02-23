import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './components/home/product/product.component';
import { InformationComponent } from './components/home/information/information.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { PopupModule } from 'src/app/shared/popup/popup.module';

@NgModule({
  declarations: [HomeComponent, ProductComponent, InformationComponent],
  imports: [CommonModule, RouterModule, PopupModule],
  exports: [HomeComponent],
  
})
export class HomeModule {}
