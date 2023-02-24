import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
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
import Draw from 'ol/interaction/Draw.js';
import Overlay from 'ol/Overlay.js';
import { Circle as CircleStyle, Stroke } from 'ol/style.js';
import { LineString, Point, Polygon } from 'ol/geom.js';
import { Vector as VectorLayer } from 'ol/layer.js';
import { getArea, getLength } from 'ol/sphere.js';
import { unByKey } from 'ol/Observable.js';
import { Size } from 'ol/size';
import {
  MatDialog,
} from '@angular/material/dialog';
import { PopupComponent } from 'src/app/shared/popup/popup/popup.component';
import { Feature } from 'ol';
import { Collaborator } from 'src/app/shared/popup/popup/models/collaborator.model';
import { CollaboratorService } from 'src/app/shared/services/collaborator.service';
import { boundingExtent } from 'ol/extent';

let sketch: any;

/**
 * The help tooltip element.
 * @type {HTMLElement}
 */
let helpTooltipElement: any;

/**
 * Overlay to show the help messages.
 * @type {Overlay}
 */
let helpTooltip: any;

/**
 * The measure tooltip element.
 * @type {HTMLElement}
 */
let measureTooltipElement: any;

/**
 * Overlay to show the measurement.
 * @type {Overlay}
 */
let measureTooltip: any;

/**
 * Message to show when the user is drawing a polygon.
 * @type {string}
 */
const continuePolygonMsg: string = 'Click to continue drawing the polygon';

/**
 * Message to show when the user is drawing a line.
 * @type {string}
 */
const continueLineMsg: string = 'Click to continue drawing the line';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  
  zoom = 5;
  styles = ['OSM', 'States', 'Raster', 'Vector'];
  source: VectorSource = new VectorSource();
  vector = new VectorLayer({
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
  hillshadeURL: string =
    'https://server.arcgisonline.com/ArcGIS/rest/services/Elevation/World_Hillshade/MapServer/tile/{z}/{y}/{x}';
  hillshadeSource = new XYZ({
    url: this.hillshadeURL,
  });
  markerFeatures: any = [];
    sourceMarker = new VectorSource({ features: this.markerFeatures });
   layer = new VectorLayer({ source: this.sourceMarker, visible: true });
  layers = [
    new TileLayer({
      visible: true,
      source: new OSM(),
    }),
    new ImageLayer({
      extent: [-13884991, 2870341, -7455066, 6338219],
      visible: true,
      source: new ImageWMS({
        url: 'https://ahocevar.com/geoserver/wms',
        params: { LAYERS: 'topp:states' },
        ratio: 1,
        serverType: 'geoserver',
      }),
    }),
    new TileLayer({
      source: this.hillshadeSource,
      visible: false,
      opacity: 0.5,
    }),
    this.vector,
    this.layer,
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
    projection: 'EPSG:4326',
    // comment the following two lines to have the mouse position
    // be placed within the map.
    className: 'custom-mouse-position',
    target: document.getElementById('mouse-position') || undefined,
  });
   

  collaborators: Collaborator[] = [];
  //visibilityPopupWindow: boolean = false;

  public map!: Map;
  constructor(public dialog: MatDialog, private collaboratorService: CollaboratorService) {}

  ngOnInit(): void {
    if (!this.map) {
      console.log("init")
      this.createMap();
    } else {
      console.log('ng init with an existing ma is running');
    }
    setTimeout(() => {}, 0);
    this.addMeasurmentLinePolygon(this.source, this.map);
  }
  ngAfterInit() {
    this.collaboratorService.getCollaborators().subscribe((collaborators) => (this.collaborators = collaborators));
     this.collaborators.map(collaborator => {
      this.markerFeatures.push(new Feature({
        geometry: new Point(collaborator.position),
      }))
    }) 
  }

  downloadPngMap = function (map: Map): any {
    const mapCanvas = document.createElement('canvas');

    const size: Size | undefined = map.getSize();

    if (size) {
      console.log(size, 'color: red');
      mapCanvas.width = size[0];
      mapCanvas.height = size[1];
      console.log(mapCanvas);
    }

    const mapContext = mapCanvas.getContext('2d');
    Array.prototype.forEach.call(
      map.getViewport().querySelectorAll('.ol-layer canvas, canvas.ol-layer'),
      function (canvas) {
        if (canvas.width > 0) {
          const opacity =
            canvas.parentNode.style.opacity || canvas.style.opacity;
          if (mapContext) {
            mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
          }
          let matrix;
          const transform = canvas.style.transform;
          if (transform) {
            // Get the transform parameters from the style's transform matrix
            matrix = transform
              .match(/^matrix\(([^\(]*)\)$/)[1]
              .split(',')
              .map(Number);
          } else {
            matrix = [
              parseFloat(canvas.style.width) / canvas.width,
              10,
              10,
              parseFloat(canvas.style.height) / canvas.height,
              20,
              30,
            ];
          }
          // Apply the transform to the export map context
          CanvasRenderingContext2D.prototype.setTransform.apply(
            mapContext,
            matrix
          );
          const backgroundColor = canvas.parentNode.style.backgroundColor;
          if (backgroundColor) {
            mapContext ? (mapContext.fillStyle = backgroundColor) : 0;
            mapContext
              ? mapContext.fillRect(0, 0, canvas.width, canvas.height)
              : 0;
          }
          mapContext ? mapContext.drawImage(canvas, 0, 0) : 0;
        }
      }
    );
    if (mapContext) {
      mapContext.globalAlpha = 1;
      mapContext.setTransform(1, 0, 0, 1, 0, 0);
    }

    var a = document.createElement('a'); //Create <a>
    a.href = mapCanvas.toDataURL(); //Image Base64 Goes here

    a.download = 'Image.png'; //File name Here
    a.click(); //Downloaded file

    map.renderSync();
  };

  toggleWindowShowCollaboratos(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: { type: 'collaborators' },
    });
  }

  toggleWindowDownloadPdf(): void {
    const mapData = this.map;
    console.log(mapData.getView().getCenter())
    const dialogRef = this.dialog.open(PopupComponent, {
      data: { type: 'map', map: mapData, zoom: mapData.getView().getZoom(), center: mapData.getView().getCenter(), maxZoom: mapData.getView().getMaxZoom() },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      //this.visibilityPopupWindow = result;
    });
  }

  pointerMoveHandler = function (evt: any) {
    if (evt.dragging) {
      return;
    }
    /** @type {string} */
    let helpMsg: string = 'Click to start drawing';

    if (sketch) {
      const geom = sketch.getGeometry();
      if (geom instanceof Polygon) {
        helpMsg = continuePolygonMsg;
      } else if (geom instanceof LineString) {
        helpMsg = continueLineMsg;
      }
    }
    helpTooltipElement.innerHTML = helpMsg;
    helpTooltip.setPosition(evt.coordinate);
    helpTooltipElement.classList.remove('hidden');
  };

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
        extent: transformExtent(maxExtent, 'EPSG:3857', 'EPSG:900913'),
        projection : 'EPSG:900913',
        center: fromLonLat([21, 52.23]),
        zoom: this.zoom,
        maxZoom: 18,
        minZoom: 2,
        rotation: 0.5,
        
      }),
    });
    //this.map.addLayer(layer);
  }

  onChangeLayers(event: any) {
    console.log(event)
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

  addMeasurmentLinePolygon(source: any, map: Map) {
    this.map.on('pointermove', this.pointerMoveHandler);
    this.map.getViewport().addEventListener('mouseout', function () {
      helpTooltipElement.classList.add('hidden');
    });
    const typeSelect: any = document.getElementById('type');
    let draw: any;
    const formatLength = function (line: any) {
      const length = getLength(line);
      let output;
      if (length > 100) {
        output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
      } else {
        output = Math.round(length * 100) / 100 + ' ' + 'm';
      }
      return output;
    };

    /**
     * Format area output.
     * @param {Polygon} polygon The polygon.
     * @return {string} Formatted area.
     */
    const formatArea = function (polygon: Polygon): string {
      const area = getArea(polygon);
      let output: string;
      if (area > 10000) {
        output =
          Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
      } else {
        output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
      }
      return output;
    };

    function addInteraction() {
      const type = typeSelect.value == 'area' ? 'Polygon' : 'LineString';
      draw = new Draw({
        source: source,
        type: type,
        style: new Style({
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)',
          }),
          stroke: new Stroke({
            color: 'rgba(0, 0, 0, 0.5)',
            lineDash: [10, 10],
            width: 2,
          }),
          image: new CircleStyle({
            radius: 5,
            stroke: new Stroke({
              color: 'rgba(0, 0, 0, 0.7)',
            }),
            fill: new Fill({
              color: 'rgba(255, 255, 255, 0.2)',
            }),
          }),
        }),
      });
      map.addInteraction(draw);

      createMeasureTooltip();
      createHelpTooltip();

      let listener: any;
      draw.on('drawstart', function (evt: any) {
        // set sketch
        sketch = evt.feature;

        /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
        let tooltipCoord: any = evt.coordinate;

        listener = sketch.getGeometry().on('change', function (evt: any) {
          const geom = evt.target;
          let output;
          if (geom instanceof Polygon) {
            output = formatArea(geom);
            tooltipCoord = geom.getInteriorPoint().getCoordinates();
          } else if (geom instanceof LineString) {
            output = formatLength(geom);
            tooltipCoord = geom.getLastCoordinate();
          }
          measureTooltipElement.innerHTML = output;
          measureTooltip.setPosition(tooltipCoord);
        });
      });

      draw.on('drawend', function () {
        measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
        measureTooltip.setOffset([0, -7]);
        // unset sketch
        sketch = null;
        // unset tooltip so that a new one can be created
        measureTooltipElement = null;
        createMeasureTooltip();
        unByKey(listener);
      });
    }

    /**
     * Creates a new help tooltip
     */
    function createHelpTooltip() {
      if (helpTooltipElement) {
        helpTooltipElement.parentNode.removeChild(helpTooltipElement);
      }
      helpTooltipElement = document.createElement('div');
      helpTooltipElement.className = 'ol-tooltip hidden';
      helpTooltip = new Overlay({
        element: helpTooltipElement,
        offset: [15, 0],
        positioning: 'center-left',
      });
      map.addOverlay(helpTooltip);
    }

    /**
     * Creates a new measure tooltip
     */
    function createMeasureTooltip() {
      if (measureTooltipElement) {
        measureTooltipElement.parentNode.removeChild(measureTooltipElement);
      }
      measureTooltipElement = document.createElement('div');
      measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
      measureTooltip = new Overlay({
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center',
        stopEvent: false,
        insertFirst: false,
      });
      map.addOverlay(measureTooltip);
    }

    /**
     * Let user change the geometry type.
     */
    typeSelect.onchange = function () {
      map.removeInteraction(draw);
      addInteraction();
    };

    addInteraction();
  }
}
