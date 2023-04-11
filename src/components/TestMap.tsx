import React, { FC, useEffect, useRef } from 'react';
import { Loader, LoaderOptions } from 'google-maps';
import { SourceMapDevToolPlugin } from 'webpack';
import { petsData } from './petsDataInterface'

// interface petsData {
//   lat: number,
//   lng: number,
//   _id: number,
//   owner_id: number,
//   date_last_seen: string,
//   species: string,
//   breed: string,
//   description: string,
//   name: string,
//   img_src: string
// }

interface MapProps {
    petsArray: petsData[]
}

const Map: FC<MapProps> = ({ petsArray }) => {
  //instantiate ref to attach map to
  const mapRef = useRef<HTMLDivElement| null>(null);


  //api config
  const options: LoaderOptions = {};
  const loader = new Loader('AIzaSyBro2kUXbOjXXxiQqn7bhx1Udcf5Nowx4c', options);

  //interface for position
  interface LatLong {
    lat? : number;
    long?: number;
  }

  useEffect(() => {

    //intialize map
    const initMap = async () => {
      const userCoords = {lat: 0, long: 0}
      //query user location
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
          userCoords.lat = position.coords.latitude;
          userCoords.long = position.coords.longitude;
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
          center: { lat: userCoords.lat, lng: userCoords.long },
          zoom: 8,
        })
        console.log('Map instance created:', map)

        //create id and container for map markers
        // let markerId = 0;
        const mapMarkers: { [key: number]: google.maps.Marker} = {};

        //add click event for generating markers
        map.addListener('tilesloaded', () => {
          // console.log('inside map listener')
          // console.log('This is the petsArray inside mapListener', petsArray)
          // iterate through pets array and generate a marker using each pets' lat and lng
          for (let i = 0; i < petsArray.length; i++) {
            //console.log('in the for loop');
            const lat = petsArray[i].lat;
            const lng = petsArray[i].lng;
            const petCoords: google.maps.LatLngLiteral = {lat, lng}    
            // console.log('here are petCoords', petCoords);        
            const marker = new google.maps.Marker({
              position: petCoords,
              map: map,
            })
            console.log('This is the position of the marker:', marker.getPosition()?.lat)
            mapMarkers[petsArray[i]._id] = marker;
            //console.log('These are the markers', mapMarkers)
          }
          //add marker to array, iterate marker ID
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

