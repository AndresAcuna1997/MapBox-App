import axios from "axios";

export const directionApi = axios.create( {
  baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
  params: {
    alternatives: false,
    geometries: 'geojson',
    overview: 'simplified',
    steps: 'false',
    access_token: 'pk.eyJ1IjoicmF3bGx6IiwiYSI6ImNsc2w0NG1yazA1NmIyanJuaWQ2cDk5MW8ifQ.PiL6YX6UmBuH2FuHWjWdDQ'
  }
} );