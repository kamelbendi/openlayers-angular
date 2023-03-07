import { Map, Overlay } from 'ol';
import { LineString, Polygon } from 'ol/geom';
import Draw from 'ol/interaction/Draw';
import { Fill, Stroke, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import { unByKey } from 'ol/Observable.js';
import { getArea, getLength } from 'ol/sphere.js';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { MapConstants } from '../MapConstants.enum';


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


/**
 * The measure tooltip element.
 * @type {HTMLElement}
 */
let measureTooltipElement: any;



interface IMeasure {
  map: Map;
  source: VectorSource;
  drawingType: string;
}

export class Measure implements IMeasure {
  measureTooltip: any;
  helpTooltip: any;
  public map!: Map;
  drawingType: string = 'length';
  source: VectorSource;
  draw: any;
  measureTooltipElement: HTMLDivElement = new HTMLDivElement();
  helpTooltipElement: HTMLDivElement = new HTMLDivElement();

  constructor(type: string, map: Map, source: VectorSource ) {
    this.drawingType = type;
    this.map = map;
    this.source = source;
    
  }

  get type() {
    return this.drawingType;
  }

  set type(newType) {
    if (this.drawingType !== newType) {
      this.drawingType = newType;
      this.changeDrawingMethod();
    }
  }

  addInteraction() {
    const type = this.drawingType === MapConstants.areaMeasure ? MapConstants.areaMeasure : MapConstants.lengthMeasure;
    this.draw = new Draw({
      source: this.source,
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
    this.map.addInteraction(this.draw);

    this.createMeasureTooltip();
    this.createHelpTooltip();

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

    let listener: any;
    /* this.draw.on('drawstart', function (evt: any) {
      // set sketch
      sketch = evt.feature;

      // @type {import("../src/ol/coordinate.js").Coordinate|undefined} 
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

    this.draw.on('drawend', function () {
      measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
      measureTooltip.setOffset([0, -7]);
      // unset sketch
      sketch = null;
      // unset tooltip so that a new one can be created
      measureTooltipElement = null;
      createMeasureTooltip();
      unByKey(listener);
    }); */
  }

  /**
   * Creates a new help tooltip
   */
  createHelpTooltip() {
    if (this.helpTooltipElement) {
        this.helpTooltipElement = new HTMLDivElement();
    }
    this.helpTooltipElement = document.createElement('div') as HTMLDivElement;
    console.log(helpTooltipElement)
    this.helpTooltipElement.className = 'ol-tooltip hidden';
    this.helpTooltip = new Overlay({
      element: helpTooltipElement,
      offset: [15, 0],
      positioning: 'center-left',
    });
    this.map.addOverlay(this.helpTooltip);
  }

  /**
   * Creates a new measure tooltip
   */
  createMeasureTooltip() {
    if (this.measureTooltipElement) {
      this.measureTooltipElement = new HTMLDivElement();
    }
    this.measureTooltipElement = document.createElement('div') as HTMLDivElement;
    this.measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
    this.measureTooltip = new Overlay({
      element: measureTooltipElement,
      offset: [0, -15],
      positioning: 'bottom-center',
      stopEvent: false,
      insertFirst: false,
    });
    this.map.addOverlay(this.measureTooltip);
  }

  addMeasurmentLinePolygon() {
    this.map.on('pointermove', evt =>  this.pointerMoveHandler(evt, this.helpTooltipElement, this.helpTooltip));
    this.map.getViewport().addEventListener('mouseout', function () {
      helpTooltipElement.classList.add('hidden');
    });
    //this.draw = undefined;

    /**
     * Let user change the geometry type.
     */
    this.changeDrawingMethod();
    this.addInteraction();
  }

  changeDrawingMethod() {
    this.map.removeInteraction(this.draw);
    this.addInteraction();
  }

  pointerMoveHandler = function (evt: any, helpTooltipElement: HTMLDivElement, helpTooltip: any) {
    if (evt.dragging) {
      return;
    }
    /** @type {string} */
    let helpMsg: string = 'Click to start drawing';

    if (sketch) {
      const geom = sketch.getGeometry();
      if (geom instanceof Polygon) {
        helpMsg = MapConstants.continuePolygonMsg;
      } else if (geom instanceof LineString) {
        helpMsg = MapConstants.continueLineMsg;
      }
    }
    helpTooltipElement.innerHTML = helpMsg;
    helpTooltip.setPosition(evt.coordinate);
    helpTooltipElement.classList.remove('hidden');
  };

  /*  set setFunction(newOnChange: () => void) {
    this.onChange = newOnChange;
  } */

}
