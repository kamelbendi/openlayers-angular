import Draw from "ol/interaction/Draw";
import { createReducer, on } from '@ngrx/store';
import VectorSource from "ol/source/Vector";
import { Fill, Stroke, Style } from "ol/style";
import CircleStyle from "ol/style/Circle";
import { changeDrawingType, draw } from "../actions";
import { MapConstants } from "../MapConstants.enum";
//import { drawLineString, drawPolygon } from "../actions/draw.actions";

export const ADD_INTERACTION = 'add interaction';

export interface MapState {
  draw: any;
  drawType: string,
}

export const mapFeatureKey: string = 'map';


const initialState: MapState = {

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
  drawType: 'LineString',
};

export const drawReducer = createReducer(
    initialState,
    on(draw.lineString, (state) => ({ ...state})),
    on(draw.polygon, (state) => ({ ...state})),
    //on(addDrawingAction.linestring, state => ({ ...state, away: state.away + 1})),
);

export const changeTypeReducer = createReducer(
  initialState,
  on(changeDrawingType.toLineString, (state) => ({ ...state, drawType: MapConstants.lengthMeasure.toString()})),
  on(changeDrawingType.toPolygon, (state) => ({ ...state, drawType: MapConstants.areaMeasure.toString()})),
)


/* export function addInteraction(initialState: any, action: any) {
    switch (action.type){
        case ADD_INTERACTION:
            return [...initialState, action.payload];
        default:
            return initialState;
        }
} */



/* export const reducer = createReducer(
  initialState,
  on(LayoutActions.closeSidenav, () => ({ showSidenav: false })),
  on(LayoutActions.openSidenav, () => ({ showSidenav: true })),
  on(AuthActions.logoutConfirmation, () => ({ showSidenav: false })),
);

export const selectShowSidenav = (state: State) => state.draw;
 */

