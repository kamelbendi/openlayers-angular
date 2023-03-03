import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ZoomSlider } from 'ol/control';
import TileLayer from 'ol/layer/Tile';
import Map from 'ol/Map.js';
import { OSM } from 'ol/source';
import { PdfService } from 'src/app/shared/services/pdf/pdf.service';
import { PopupComponent } from '../../popup.component';
import { defaults as defaultControls } from 'ol/control.js';
import { Feature, View } from 'ol';
import { fromLonLat } from 'ol/proj';
import WKT from 'ol/format/WKT';
import { MapConstants } from 'src/app/modules/map/MapConstants.enum';

@Component({
  selector: 'app-download-pdf-map',
  templateUrl: './download-pdf-map.component.html',
  styleUrls: ['./download-pdf-map.component.css'],
})

export class DownloadPdfMapComponent {
  margin: number = 10;
  public mapToPrint!: Map;
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
  };

  format = new WKT();
  feature: Feature = this.format.readFeature(
    'POLYGON((10.689697265625 -25.0927734375, 34.595947265625 ' +
      '-20.1708984375, 38.814697265625 -35.6396484375, 13.502197265625 ' +
      '-39.1552734375, 10.689697265625 -25.0927734375))'
  );

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopupComponent>,
    private pdfService: PdfService
  ) {
    this.pdfMake.vfs = this.pdfFonts.pdfMake.vfs;
    
    //this.viewResolution = this.data.map.getView().getResolution();
  }

  ngOnInit() {
    (this.data.zoom && this.data.center && this.data.maxZoom ? 
      this.generateMapToPrint(
        this.data.zoom,
        this.data.center,
        this.data.maxZoom
      ) : 0
      )

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  generateMapToPrint(zoom: number, center: number[], maxZoom: number): void {
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
        center: fromLonLat(center, MapConstants.epsg4326),
        zoom: zoom,
        maxZoom: maxZoom,
      }),
    });
  }

  downloadPdfMap(feature: Feature): void {
    this.selectedMapPdfOptions.dimentions = this.paperDetails.find(
      (obj) => obj.value === this.selectedMapPdfOptions.value
    )?.dimentions || [0, 0];
    
    feature.getGeometry()?.transform(MapConstants.epsg4326, MapConstants.epsg3857);
    document.body.style.cursor = 'progress';
    var docDefinition = this.pdfService.downloadPdf(
      this.selectedMapPdfOptions,
      this.margin,
    ); // use of service
    document.body.style.cursor = 'auto';
    this.pdfMake.createPdf(docDefinition).open();
  }
}
