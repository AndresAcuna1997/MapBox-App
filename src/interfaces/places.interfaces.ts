export interface PlacesResponse {
  type:        string;
  query:       string[];
  features:    Feature[];
  attribution: string;
}

export interface Feature {
  id:            string;
  type:          FeatureType;
  place_type:    PlaceType[];
  relevance:     number;
  properties:    Properties;
  text_en:       string;
  place_name_en: string;
  text:          string;
  place_name:    string;
  center:        number[];
  geometry:      Geometry;
  context:       Context[];
}

export interface Context {
  id:           string;
  mapbox_id:    string;
  text_en:      string;
  text:         string;
  wikidata?:    string;
  short_code?:  string;
  language_en?: Language;
  language?:    Language;
}

export enum Language {
  En = "en",
}

export interface Geometry {
  coordinates: number[];
  type:        GeometryType;
}

export enum GeometryType {
  Point = "Point",
}

export enum PlaceType {
  Poi = "poi",
}

export interface Properties {
  foursquare: string;
  landmark:   boolean;
  category:   string;
  maki?:      string;
  address?:   string;
}

export enum FeatureType {
  Feature = "Feature",
}
