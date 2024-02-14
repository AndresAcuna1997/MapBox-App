import { Map } from 'mapbox-gl';
import { createContext } from 'react';

interface MapContext {
  isMapReady: boolean;
  map?: Map;
  setMap: ( map: Map ) => void;
  getRouteBetweenPoints: ( start: [ number, number ], end: [ number, number ] ) => Promise<void>;
  travelDetails?: { kms: number | null, travelTime: number | null; };
}

export const MapContext = createContext( {} as MapContext );