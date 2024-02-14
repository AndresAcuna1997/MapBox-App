import { useContext } from 'react';
import { MapContext } from '../context/map/MapContext';

export const TravelDetail = () => {

  const { travelDetails } = useContext( MapContext );

  return (
    <>
      {
        travelDetails?.kms ? (
          <div className="fixed bottom-5 left-1/2 -translate-x-10 bg-white p-5 text-center shadow-2xl" >
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