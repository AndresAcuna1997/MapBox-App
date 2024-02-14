import { useContext } from 'react';
import { MapContext } from '../context/map/MapContext';
import { PlacesContext } from '../context/places/PlacesContext';

export const BtnMyLocation = () => {

  const { map } = useContext( MapContext );
  const { userLocation } = useContext( PlacesContext );

  const handleClick = () => {
    if ( !map ) throw new Error( "Mapa no esta listo" );
    if ( !userLocation ) throw new Error( "Mapa no esta listo" );

    map?.flyTo( { zoom: 14, center: userLocation, animate: true } );
  };

  return (
    <button
      onClick={ handleClick }
      className="fixed top-5 right-5 rounded-md bg-blue-700 text-white p-3 font-semibold hover:bg-blue-500 transition-all duration-300">
      My Location
    </button>
  );
};