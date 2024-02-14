import { useEffect, useReducer } from 'react';
import { PlacesContext } from './PlacesContext';
import { placesReducer } from './placesReducer';
import { getUserLocation } from '../../helpers/getUserLocation';
import { searchApi } from '../../apis/searchApi';
import { Feature, PlacesResponse } from '../../interfaces/places.interfaces';

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [ number, number];
  isLoadingPlaces: boolean;
  places: Feature[];
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: []
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const PlacesProvider = ( { children }: Props ) => {

  const [ state, dispatch ] = useReducer( placesReducer, INITIAL_STATE );

  const searchPlacesByTerm = async ( query: string ) => {
    if ( query.length === 0 ) return dispatch( { type: 'clearPlaces' } );
    if ( !state.userLocation ) throw new Error( "No user location available" );

    dispatch( { type: 'setLoadingPlaces' } );

    const res = await searchApi.get<PlacesResponse>( `/${ query }.json`, {
      params: {
        proximity: state.userLocation?.join( ',' )
      }
    } );

    dispatch( { type: 'setPlaces', payload: res.data.features } );


  };

  useEffect( () => {
    getUserLocation()
      .then( userLocation => {
        dispatch( { type: 'setUserLocation', payload: userLocation } );
      } );
  }, [] );


  return (
    <PlacesContext.Provider value={ { ...state, searchPlacesByTerm } }>
      { children }
    </PlacesContext.Provider>
  );
};