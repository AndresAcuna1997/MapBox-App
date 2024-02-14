export async function getUserLocation(): Promise<[ number, number ]> {

  return new Promise( ( res, rej ) => {
    navigator.geolocation.getCurrentPosition(
      ( { coords } ) => {
        res( [ coords.longitude, coords.latitude ] );
      },
      ( err ) => {
        alert( 'Error getting location: ' + err.message );
        console.log( err );
        rej();
      } );
  } );
}