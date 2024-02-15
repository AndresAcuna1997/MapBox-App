import { useContext } from 'react';
import { MapContext } from '../context/map/MapContext';
import { PlacesContext } from '../context/places/PlacesContext';

export const TravelDetail = () => {

  const { travelDetails } = useContext( MapContext );
  const { places } = useContext( PlacesContext );

  return (
    <>
      {
        ( travelDetails?.kms && places.length !== 0 ) ? (
          <div className="fixed bottom-5 left-1/2 -translate-x-20 border-2 border-gray-300 bg-white p-5 text-center shadow-2xl" >
            <h5 className="font-bold">Travel Details</h5>
            <span className="flex flex-col">
              <p>Distance: { travelDetails?.kms } kms</p>
              <p>Time: { travelDetails?.travelTime } mins</p>
            </span>
          </div >
        ) : ( <></> )
      }
    </>
  );
};