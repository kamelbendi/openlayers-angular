import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './components/home/product/product.component';
import { InformationComponent } from './components/home/information/information.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { PopupModule } from 'src/app/shared/popup/popup.module';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@NgModule({
  declarations: [HomeComponent, ProductComponent, InformationComponent],
  imports: [CommonModule, PopupModule, MatDialogModule],
  exports: [HomeComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class HomeModule {}
