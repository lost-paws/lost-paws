import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { useMemo, FC } from "react";
import petsData from "../petsInterface";

interface MapParentProps {
  onIdle?: (map: google.maps.Map) => void;
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onMarkerClicked: (payload: petsData) => void;
  markers?: petsData[];
  center: google.maps.LatLngLiteral;
  zoom: number;
  apiKey: string;
  activePetId?: number;
}

export default function MapParent({
  apiKey,
  onClick,
  onIdle, 
  zoom,
  center,
  markers,
  onMarkerClicked,
  activePetId,
}: MapParentProps) {

  return (
    <div>
      <Map
        className='map'

      >
        
      </Map>
    </div>
  )
}