import { Map } from 'mapbox-gl';

export default function removeCurrentTravel( map: Map, currentRoute: string ) {
  map.removeLayer( currentRoute );
  map.removeSource( currentRoute );
}