import { createAction, props } from '@ngrx/store';
/* export enum DrawingTypes{
    lineString = "[Type Line] LinString Type"
} */

export const toLineString = createAction('[Type Line] LinString Type');
export const toPolygon = createAction('[Type Polygon] Polygon Type');
