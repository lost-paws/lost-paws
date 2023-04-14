import React, { FC, useEffect, useRef } from 'react';
import { Loader, LoaderOptions } from 'google-maps';
import { SourceMapDevToolPlugin } from 'webpack';
import { GeolibAltitudeInputValue, GeolibInputCoordinates } from 'geolib/es/types';
import * as geolib from 'geolib';

const Map: FC = () => {
  //instantiate ref to attach map to
  const mapRef = useRef<HTMLDivElement| null>(null);


  //api config
  const options: LoaderOptions = {};
  const loader = new Loader('AIzaSyBro2kUXbOjXXxiQqn7bhx1Udcf5Nowx4c', options);

  //interface for position

  interface LatLng {
    latitude: number
    longitude: number
  }

  useEffect(() => {

    //intialize map
    const initMap = async () => {
      const userCoords: LatLng = {
        latitude: 0,
        longitude: 0
      }
      //query user location
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
          userCoords.latitude = position.coords.latitude;
          userCoords.longitude = position.coords.longitude;
          console.log('These are the userCoords:', userCoords);
        });
      }
      console.log('Loading maps API');
      //load loader
      const google = await loader.load();
      console.log('Google maps api:', google);
      //create map object
      if (mapRef.current) {
        console.log('mapRef.current is not null:', mapRef.current);
        console.log('Creating new map instance...');
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: userCoords.latitude, lng: userCoords.longitude },
          zoom: 8,
        })
        console.log('Map instance created:', map)

        //create id and container for map markers
        let markerId = 0;
        const mapMarkers: { [key: number]: google.maps.Marker} = {};

        //add click event for generating markers
        map.addListener('click', (clickEvent) => {
          const lat = clickEvent.latLng.lat();
          const lng = clickEvent.latLng.lng();
          const clickCoords : google.maps.LatLngLiteral = {lat, lng};
          const marker = new google.maps.Marker({
            position: clickCoords,
            map: map,
          })

          //add marker to array, iterate marker ID
          mapMarkers[markerId] = marker;
          markerId++;

        })
      }
    }
    initMap();
  }, [])

  return (
  <div ref={mapRef} className='map' style={{ height: '100%', width: '100%' }}></div>
  );
};

export default Map;

