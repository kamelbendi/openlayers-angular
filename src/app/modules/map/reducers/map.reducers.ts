import Draw from 'ol/interaction/Draw';
import { createReducer, on } from '@ngrx/store';
import VectorSource from 'ol/source/Vector';
import { Fill, Stroke, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import { changeDrawingType, changeSelectedLayer, draw } from '../actions';
import { MapConstants } from '../MapConstants.enum';
//import { drawLineString, drawPolygon } from "../actions/draw.actions";
import { createFormGroupState, FormGroupState } from 'ngrx-forms';
import { SELECTED_LAYERS_OPTIONS } from '../model/map.model';

export const ADD_INTERACTION = 'add interaction';

export interface MapState {
  draw: any;
  drawingType: string;
  selectedLayer: string;
}

export const initialInputState = {
  drawType: 'LineString',
  selectedLayer: 'OSM',
  draw: new Draw({
    source: new VectorSource(),
    type: 'LineString',
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
  }),
};

export const drawReducer = createReducer(
  initialInputState,
  on(draw.lineString, (state) => ({ ...state })),
  on(draw.polygon, (state) => ({ ...state }))
  //on(addDrawingAction.linestring, state => ({ ...state, away: state.away + 1})),
);

export const changeTypeReducer = createReducer(
  initialInputState,
  on(changeDrawingType.toLineString, (state) => ({
    ...state,
    drawType: MapConstants.lengthMeasure.toString(),
  })),
  on(changeDrawingType.toPolygon, (state) => ({
    ...state,
    drawType: MapConstants.areaMeasure.toString(),
  }))
);

export const changeLayerReducer = createReducer(
  initialInputState,
  on(changeSelectedLayer.toOSM, (state) => ({
    ...state,
    selectedLayer: SELECTED_LAYERS_OPTIONS.osm,
  })),
  on(changeSelectedLayer.toRaster, (state) => ({
    ...state,
    selectedLayer: SELECTED_LAYERS_OPTIONS.raster,
  })),
  on(changeSelectedLayer.toUSA, (state) => ({
    ...state,
    selectedLayer: SELECTED_LAYERS_OPTIONS.states,
  }))
);
