import React from 'react';
import ReactDOM from 'react-dom/client';
import { MapsApp } from './MapsApp.tsx';

import mapboxgl from 'mapbox-gl';
 
mapboxgl.accessToken = 'pk.eyJ1IjoicmF3bGx6IiwiYSI6ImNsc2w0NG1yazA1NmIyanJuaWQ2cDk5MW8ifQ.PiL6YX6UmBuH2FuHWjWdDQ';

if ( !navigator.geolocation ) {
  alert( 'Geolocation is not supported by your browser' );
  throw new Error( 'Geolocation is not supported by your browser' );
}

ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>,
);
