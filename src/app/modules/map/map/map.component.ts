import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { OSM } from 'ol/source';
import { Image as ImageLayer, Tile as TileLayer, Vector } from 'ol/layer.js';
import { defaults as defaultControls } from 'ol/control.js';
import { fromLonLat, transformExtent } from 'ol/proj';
import View from 'ol/View.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import MousePosition from 'ol/control/MousePosition.js';
import { createStringXY } from 'ol/coordinate.js';
import Map from 'ol/Map.js';
import VectorSource from 'ol/source/Vector.js';
import { Fill, Style } from 'ol/style.js';
import ZoomSlider from 'ol/control/ZoomSlider.js';
import XYZ from 'ol/source/XYZ.js';
import ImageWMS from 'ol/source/ImageWMS.js';
import { LineString, Point, Polygon } from 'ol/geom.js';
import { Vector as VectorLayer } from 'ol/layer.js';
import { Size } from 'ol/size';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from 'src/app/shared/popup/popup/popup.component';
import { Feature } from 'ol';
import { Collaborator } from 'src/app/shared/popup/popup/models/collaborator.model';
import { CollaboratorService } from 'src/app/shared/services/collaborator/collaborator.service';
import { Measure } from './measure';
import { Subject, Subscription } from 'rxjs';
import { MapConstants } from '../MapConstants.enum';
import { PngService } from '../service/png/png.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  /* private tw: Subscription;

  private yewf: Subject = new Subject<void>(); */

  //styles = ['OSM', 'States', 'Raster', 'Vector'];
  public MapConstants = MapConstants;
  source: VectorSource = new VectorSource();
  Measurmentsvector = new VectorLayer({
    source: this.source,
    visible: true,
    style: {
      'fill-color': 'rgba(255, 255, 255, 0.2)',
      'stroke-color': '#ffcc33',
      'stroke-width': 5,
      'circle-radius': 7,
      'circle-fill-color': '#ffcc33',
    },
  });

  markerFeatures: any = [];
  sourceMarker = new VectorSource({ features: this.markerFeatures });
  collaboratorsMarkerLayer = new VectorLayer({ source: this.sourceMarker, visible: false });
  layers = [
    new TileLayer({
      visible: true,
      source: new OSM(),
    }),
    new ImageLayer({
      extent: [-13884991, 2870341, -7455066, 6338219],
      visible: false,
      source: new ImageWMS({
        url: 'https://ahocevar.com/geoserver/wms',
        params: { LAYERS: 'topp:states' },
        ratio: 1,
        serverType: 'geoserver',
      }),
    }),
    new TileLayer({
      source: new XYZ({
        url: MapConstants.hillshadeURL,
      }),
      visible: false,
      opacity: 0.5,
    }),
    this.Measurmentsvector,
    this.collaboratorsMarkerLayer,
  ];

  extent = [485869.5728, 76443.1884, 837076.5648, 299941.7864];
  style = new Style({
    fill: new Fill({
      color: '#eeeeee',
    }),
  });
  vectorSource = new VectorSource({
    url: 'https://openlayers.org/data/vector/ecoregions.json',
    format: new GeoJSON(),
  });
  mousePositionControl = new MousePosition({
    coordinateFormat: createStringXY(1),
    projection: MapConstants.epsg4326,
    // comment the following two lines to have the mouse position
    // be placed within the map.
    className: 'custom-mouse-position',
    target: document.getElementById('mouse-position') || undefined,
  });

  collaborators: Collaborator[] = [];
  //visibilityPopupWindow: boolean = false;

  public map!: Map;
  drawingType = new Measure('length', this.map, this.source);
  constructor(
    public dialog: MatDialog,
    private pngService: PngService,
    private collaboratorService: CollaboratorService,
  ) {
    
  }

  ngOnInit(): void {
    if (!this.map) {
      this.createMap();
    } else {
      console.log('ng init with an existing ma is running');
    }
    setTimeout(() => {}, 0);
    this.drawingType.addMeasurmentLinePolygon();
  }

  ngAfterInit() {
    /* this.tw = this.collaboratorService
      .getCollaborators()
      .takeUntil(this.yewf)
      .subscribe((collaborators) => (this.collaborators = collaborators)); */
      this.collaboratorService
      .getCollaborators()
      .subscribe((collaborators) => (this.collaborators = collaborators));
    this.collaborators.map((collaborator) => {
      this.markerFeatures.push(
        new Feature({
          geometry: new Point(collaborator.position),
        })
      );
    });
  }

  downloadPngMap (map: Map): any {
     this.pngService.downLoadPng(map);
  };

  toggleWindowShowCollaboratos(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: { type: 'collaborators' },
    });
  }

  toggleWindowDownloadPdf(): void {
    const mapData = this.map;
    console.log(mapData.getView().getCenter());
    const dialogRef = this.dialog.open(PopupComponent, {
      data: {
        type: 'map',
        map: mapData,
        zoom: mapData.getView().getZoom(),
        center: mapData.getView().getCenter(),
        maxZoom: mapData.getView().getMaxZoom(),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  createMap() {
    var maxExtent = [-20037508, -20037508, 20037508, 20037508];
    //var restrictedExtent = maxExtent.clone();
    //console.log(this.markerFeatures)

    //var marker = new OpenLayers.Marker(lonLat1, icon1);

    this.map = new Map({
      controls: defaultControls().extend([
        new ZoomSlider(),
        this.mousePositionControl,
      ]),

      layers: this.layers,
      target: 'map',
      view: new View({
        extent: transformExtent(
          maxExtent,
          MapConstants.epsg3857,
          MapConstants.epsg900913,
        ),
        projection: MapConstants.epsg900913,
        center: fromLonLat([21, 52.23]),
        zoom: 5,
        maxZoom: 18,
        minZoom: 2,
        rotation: 0.5,
      }),
    });
    //this.map.addLayer(layer);
  }

  onChangeLayers(event: string) {
    this.layers.map((layer) => layer.setVisible(false));
    switch (event) {
      case 'States': {
        this.layers[1].setVisible(true);
        this.layers[3].setVisible(true);
        this.layers[0].setVisible(true);
        this.layers[4].setVisible(true);
        break;
      }
      case 'Raster': {
        this.layers[2].setVisible(true);
        this.layers[3].setVisible(true);
        this.layers[0].setVisible(true);
        this.layers[4].setVisible(true);
        break;
      }
      case 'OSM': {
        this.layers[0].setVisible(true);
        this.layers[3].setVisible(true);
        this.layers[4].setVisible(true);
        break;
      }
      default:
        this.layers[0].setVisible(true);
        break;
    }
  }

  /* m() {
    this.tw?.unsubscribe();

    this.yewf.next();
    // this.yewf.comlepte()
  } */
}
