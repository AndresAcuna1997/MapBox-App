import { AnySourceData, LngLatBounds, Map, Marker, Popup } from 'mapbox-gl';
import { MapContext } from './MapContext';
import { useContext, useEffect, useReducer } from 'react';
import { mapReducer } from './mapReducer';
import { PlacesContext } from '../places/PlacesContext';
import { directionApi } from '../../apis/directionsApi';
import { Directions } from '../../interfaces/directions.interface';
import removeCurrentTravel from '../../helpers/removeCurrentTravel';

export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
  travelDetails?: { kms: number | null, travelTime: number | null; };
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
  travelDetails: { kms: null, travelTime: null }
};


export const MapProvider = ( { children }: Props ) => {

  const [ state, dispatch ] = useReducer( mapReducer, INITIAL_STATE );

  const { places } = useContext( PlacesContext );

  useEffect( () => {
    state.markers.forEach( marker => marker.remove() );
    const newMarkers: Marker[] = [];

    for ( const place of places ) {
      const [ lng, lat ] = place.center;
      const popup = new Popup()
        .setHTML( `
          <h6>${ place.text_en }</h6>
          <p>${ place.place_name_en }</p>
        `);

      const newMarker = new Marker()
        .setPopup( popup )
        .setLngLat( [ lng, lat ] )
        .addTo( state.map! );

      newMarkers.push( newMarker );
    }

    dispatch( { type: 'setMarkers', payload: newMarkers } );


  }, [ places ] );


  useEffect( () => {
    if ( places?.length !== 0 ) return;
    if ( !state.map?.getLayer( 'RouteString' ) ) return;

    removeCurrentTravel( state.map!, 'RouteString' );
    dispatch( { type: 'setTravelDetail', payload: { kms: null, travelTime: null } } );

  }, [ places ] );


  const setMap = ( map: Map ) => {
    const { lat, lng } = map.getCenter();
    const myPopUp = new Popup()
      .setHTML( `
      <h4> I'm here </h4>
      <p>${ lat },${ lng }</p>
      `);

    new Marker( {
      color: '#61DAFB'
    } )
      .setLngLat( map.getCenter() )
      .setPopup( myPopUp )
      .addTo( map );

    dispatch( { type: 'setMap', payload: map } );
  };

  const getRouteBetweenPoints = async ( start: [ number, number ], end: [ number, number ] ) => {
    const res = await directionApi.get<Directions>( `/${ start.join( ',' ) };${ end.join( ',' ) }` );

    const { distance, duration, geometry } = res.data.routes[ 0 ];
    const { coordinates } = geometry;

    let kms = distance / 1000;
    kms = Math.round( kms * 100 );
    kms /= 100;
    const travelTime = Math.floor( duration / 60 );

    dispatch( { type: 'setTravelDetail', payload: { kms, travelTime } } );

    const bounds = new LngLatBounds( start, start );

    for ( const coord of coordinates ) {
      const newCoord: [ number, number ] = [ coord[ 0 ], coord[ 1 ] ];
      bounds.extend( newCoord );
    }

    state.map?.fitBounds( bounds, {
      padding: 100
    } );


    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [ {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates
          }
        } ]
      }
    };

    if ( state.map?.getLayer( 'RouteString' ) ) {
      removeCurrentTravel( state.map, 'RouteString' );
    }

    state.map?.addSource( 'RouteString', sourceData );

    state.map?.addLayer( {
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': 'black',
        'line-width': 3
      }
    } );


  };

  return (
    <MapContext.Provider value={ { ...state, setMap, getRouteBetweenPoints } }>
      { children }
    </MapContext.Provider>
  );
};