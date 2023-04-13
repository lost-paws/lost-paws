import React, { FC, useState } from 'react';
import PetsIcon from '@mui/icons-material/Pets';
import { petsData } from './petsDataInterface';
import PetCard from './PetCard';

interface Coords {
  lat: number;
  lng: number;
}

interface MarkerProps extends Coords {
  petData: petsData
}


const PetsMarker: FC<MarkerProps> = ({ lat, lng, petData }) => {
  const [showPetCard, setShowPetCard] = useState(false);
  console.log('this is the petsdata --->', petData)
  return (
    <>
      <PetsIcon
      sx={{ bgcolor: 'dda15e', color: 'white', textTransform: 'capitalize', ":hover": {
        bgcolor: "#A1CDF1",
        color: "white"
      }}}
        onClick={() => {
          setShowPetCard(true);
        }}
      >
        {/* {text || 'CLICK THIS'} */}
      </PetsIcon>
      {showPetCard && <PetCard setShowPetCard={setShowPetCard} petData={petData}/>}
    </>
  );
};

export default PetsMarker;