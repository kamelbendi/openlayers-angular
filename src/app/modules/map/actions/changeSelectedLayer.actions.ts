import { createAction, props } from '@ngrx/store';

export const toOSM = createAction('[OSM Layer] Map Layer');
export const toUSA = createAction('[States Layer] Map Layer');
export const toRaster = createAction('[Raster Layer] Map Layer');
