import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { PopupModule } from 'src/app/shared/popup/popup.module';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PngService } from './service/png/png.service';

@NgModule({
  declarations: [MapComponent],
  exports: [MapComponent],
  entryComponents: [MatDialog],
  imports: [
    CommonModule,
    MatDialogModule,
    PopupModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
  ],
  providers: [PngService],
})
export class MapModule {}
