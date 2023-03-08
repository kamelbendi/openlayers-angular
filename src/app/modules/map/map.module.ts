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
import { NgrxFormsModule, NgrxSelectOption } from 'ngrx-forms';
import { StoreModule } from '@ngrx/store';
import { changeLayerReducer, changeTypeReducer } from './reducers/map.reducers';
import { changeSelectedLayer } from './actions';

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
    NgrxFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    StoreModule.forRoot({ drawingType: changeTypeReducer, selectedLayer: changeLayerReducer}),
  ],
  providers: [PngService],
})
export class MapModule {}
