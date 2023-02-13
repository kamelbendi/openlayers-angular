import { Component, Input, Inject, NgZone } from '@angular/core';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
//import { PaperDetails } './models/PaperDetails.ts'
import Map from 'ol/Map.js';
import WKT from 'ol/format/WKT.js';

import ZoomSlider from 'ol/control/ZoomSlider.js';
import { defaults as defaultControls } from 'ol/control.js';
import { OSM } from 'ol/source';
import { Image as ImageLayer, Tile as TileLayer } from 'ol/layer.js';
import { fromLonLat } from 'ol/proj';
import View from 'ol/View.js';
import { map } from 'rxjs';
import { PdfService } from '../../services/pdf.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent {
  pdfMake = require('pdfmake/build/pdfmake.js');
  pdfFonts = require('pdfmake/build/vfs_fonts.js');

  paperDetails = [
    { dimentions: [1189, 841], text: 'A0 (slow)', value: 'a0' },
    { dimentions: [841, 594], text: 'A1', value: 'a1' },
    { dimentions: [594, 420], text: 'A2', value: 'a2' },
    { dimentions: [420, 297], text: 'A3', value: 'a3' },
    { dimentions: [297, 210], text: 'A4', value: 'a4' },
    { dimentions: [210, 148], text: 'A5 (fast)', value: 'a5' },
  ];

  selectedMapPdfOptions = {
    dimentions: [297, 210],
    value: 'a4',
    resolution: 72,
  };
  viewResolution: any;

  dpiResolutions = [
    { value: 72, text: '72 dpi (fast)' },
    { value: 150, text: '150 dpi' },
    { value: 300, text: '300 dpi (slow)' },
  ];

  format = new WKT();
  feature = this.format.readFeature(
    'POLYGON((10.689697265625 -25.0927734375, 34.595947265625 ' +
      '-20.1708984375, 38.814697265625 -35.6396484375, 13.502197265625 ' +
      '-39.1552734375, 10.689697265625 -25.0927734375))'
  );

  public mapToPrint!: Map;
  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    private pdfService: PdfService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.pdfMake.vfs = this.pdfFonts.pdfMake.vfs;
    this.data.type === 'map'
      ? (this.viewResolution = this.data.map.getView().getResolution())
      : 0;
  }

  ngAfterViewInit() {
    this.data.type === 'map'
      ? this.generateMapToPrint(
          this.data.map.getView().getZoom(),
          this.data.map.getView().getCenter(),
          this.data.map.getView().getMaxZoom()
        )
      : 0;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  generateMapToPrint(zoom: number, position: number[], maxZoom: number) {
    if (this.data.type === 'map') {
      this.mapToPrint = new Map({
        controls: defaultControls().extend([new ZoomSlider()]),
        layers: [
          new TileLayer({
            visible: true,
            source: new OSM(),
          }),
        ],
        target: 'map-to-print',
        view: new View({
          center: fromLonLat(position, 'EPSG:4326'),
          zoom: zoom,
          maxZoom: maxZoom,
        }),
      });
    }
  }

  downloadPdfMap(feature: any) {
    this.selectedMapPdfOptions.dimentions = this.paperDetails.find(
      (obj) => obj.value === this.selectedMapPdfOptions.value
    )?.dimentions || [0, 0];
    feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
    document.body.style.cursor = 'progress';
    var docDefinition = this.pdfService.downloadPdf(this.selectedMapPdfOptions); // use of service
    document.body.style.cursor = 'auto';
    this.pdfMake.createPdf(docDefinition).open();
  }
}
