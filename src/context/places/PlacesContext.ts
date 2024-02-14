import { createContext } from 'react';
import { Feature } from '../../interfaces/places.interfaces';

export interface IPlacesContext {
  isLoading: boolean;
  userLocation?: [ number, number ];
  searchPlacesByTerm: ( query: string ) => void;
  isLoadingPlaces: boolean;
  places: Feature[];
}

export const PlacesContext = createContext( {} as IPlacesContext );