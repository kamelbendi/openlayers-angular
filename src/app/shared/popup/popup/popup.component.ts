import { Component, Input, Inject } from '@angular/core';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent {
  

  
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
  }

  ngAfterViewInit() {
    
  }



 /*  onNoClick(): void {
    this.dialogRef.close();
  } */

  /* downloadPdfMap(feature: any) {
    this.selectedMapPdfOptions.dimentions = this.paperDetails.find(
      (obj) => obj.value === this.selectedMapPdfOptions.value
    )?.dimentions || [0, 0];
    feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
    document.body.style.cursor = 'progress';
    var docDefinition = this.pdfService.downloadPdf(this.selectedMapPdfOptions); // use of service
    document.body.style.cursor = 'auto';
    this.pdfMake.createPdf(docDefinition).open();
  } */
}
