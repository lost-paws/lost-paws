import React, { FC } from 'react';
import PetsIcon from '@mui/icons-material/Pets';
import { petsData } from './petsDataInterface';

interface Coords {
  lat: number;
  lng: number;
}

interface MarkerProps extends Coords {
  petData?: petsData
}

const PetsMarker: FC<MarkerProps> = ({ lat, lng, petData }) => {
  return (
    <PetsIcon
    sx={{ bgcolor: 'dda15e', color: 'white', textTransform: 'capitalize', ":hover": {
      bgcolor: "#A1CDF1",
      color: "white"
    }}}
      onClick={() => {
        console.log('THIS HAS BEEN CLICKED');
      }}
    >
      {/* {text || 'CLICK THIS'} */}
    </PetsIcon>
  );
};

export default PetsMarker;