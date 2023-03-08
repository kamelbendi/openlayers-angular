import { Map } from "ol";

export interface IMapComponent {
    map: Map;
    draw: any;
}

export const SELECTED_LAYERS_OPTIONS = {
    osm: 'OSM',
    raster: 'Raster',
    states: 'States',
  }
