import { Map, Marker } from 'mapbox-gl';
import { MapState } from './MapProvider';

type MapAction =
  | { type: 'setMap', payload: Map; }
  | { type: 'setMarkers', payload: Marker[]; }
  | { type: 'setTravelDetail', payload: { kms: number | null, travelTime: number | null; }; };

export const mapReducer = ( state: MapState, action: MapAction ): MapState => {

  switch ( action.type ) {
    case 'setMap':
      return { ...state, isMapReady: true, map: action.payload };
    case 'setMarkers':
      return { ...state, markers: action.payload };
    case 'setTravelDetail':
      return { ...state, travelDetails: { ...action.payload } };
    default:
      return state;
  }

};