import axios from "axios";


export const searchApi = axios.create( {
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  params: {
    limit: 5,
    language: 'en',
    access_token: 'pk.eyJ1IjoicmF3bGx6IiwiYSI6ImNsc2w0NG1yazA1NmIyanJuaWQ2cDk5MW8ifQ.PiL6YX6UmBuH2FuHWjWdDQ'
  }
} );