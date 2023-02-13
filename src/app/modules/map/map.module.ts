import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { PopupModule } from 'src/app/shared/popup/popup.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [MapComponent],
  exports: [MapComponent],
  imports: [CommonModule, PopupModule, MatDialogModule],
})
export class MapModule {}
