import { ChangeEvent, useContext, useRef } from 'react';
import { PlacesContext } from '../context/places/PlacesContext';
import { SearchResults } from './SearchResults';

export const SearchBar = () => {

  const debaunceRef = useRef<NodeJS.Timeout>();

  const { searchPlacesByTerm } = useContext( PlacesContext );

  const onQueryChanged = ( event: ChangeEvent<HTMLInputElement> ) => {
    if ( debaunceRef.current ) clearTimeout( debaunceRef.current );

    debaunceRef.current = setTimeout( () => {
      searchPlacesByTerm( event.target.value );
    }, 500 );
  };

  return (
    <div className="fixed top-5 left-5 p-2 rounded-md bg-white shadow-xl z-50">
      <input
        type="text"
        placeholder="Search"
        className="text-xl p-1 border border-gray-300 max-w-xs"
        onChange={ onQueryChanged }
      />

      <SearchResults />
    </div>
  );
};