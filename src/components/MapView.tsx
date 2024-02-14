import { useContext, useLayoutEffect, useRef } from 'react';
import { PlacesContext } from '../context/places/PlacesContext';
import { Loading } from './Loading';
import mapboxgl from 'mapbox-gl';
import { MapContext } from '../context/map/MapContext';

export const MapView = () => {

  const { isLoading, userLocation } = useContext( PlacesContext );
  const { setMap } = useContext( MapContext );

  const mapDiv = useRef<HTMLDivElement>( null );

  useLayoutEffect( () => {
    if ( !isLoading ) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const map = new mapboxgl.Map( {
        container: mapDiv.current!,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: userLocation,
        zoom: 14,
      } );

      setMap( map );
    }
  }, [ isLoading ] );

  if ( isLoading ) {
    return <Loading />;
  }

  return (
    <div ref={ mapDiv } className="h-screen w-screen fixed top-0 left-0">

    </div>
  );
};