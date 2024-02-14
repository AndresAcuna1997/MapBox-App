import { useContext, useState } from 'react';
import { PlacesContext } from '../context/places/PlacesContext';
import { MapContext } from '../context/map/MapContext';
import { Feature } from '../interfaces/places.interfaces';
export const SearchResults = () => {

  const { places, isLoadingPlaces, userLocation } = useContext( PlacesContext );
  const [ activeLocation, setActiveLocation ] = useState( '' );
  const { map, getRouteBetweenPoints } = useContext( MapContext );

  const handleClickTravel = ( place: Feature ) => {
    setActiveLocation( place.id );
    const [ lng, lat ] = place.center;
    map?.flyTo( { zoom: 14, center: [ lng, lat ], animate: true } );
  };

  const getRoute = ( place: Feature ) => {
    const [ lng, lat ] = place.center;
    if ( !userLocation ) return;


    getRouteBetweenPoints( userLocation, [ lng, lat ] );
  };

  if ( isLoadingPlaces ) {
    return ( <>
      <h6>Searching..</h6>
    </> );
  }

  if ( places.length === 0 ) {
    return <></>;
  }

  return (
    <ul className="mt-2">
      {
        places.map( ( place ) => (
          <li
            key={ place.id }
            onClick={ () => handleClickTravel( place ) }
            className={ `py-1 px-2 mt-2 border-gray-300 rounded-md max-w-xs hover:bg-slate-200 border ${ activeLocation === place.id ? 'bg-blue-700 text-white' : '' }` }>
            <h6 className="font-bold mb-1">{ place.text_en }</h6>
            <p className="text-sm mb-1">{ place.place_name_en }</p>
            <div className="flex gap-2">
              <button onClick={ () => getRoute( place ) } className="text-blue-700 font-semibold border border-blue-700 mb-1 px-2 py-1 rounded">
                Address
              </button>
            </div>
          </li>
        ) )
      }
    </ul>
  );
};