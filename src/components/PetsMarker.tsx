import React, { FC, useState } from 'react';
import PetsIcon from '@mui/icons-material/Pets';
import { petsData } from './petsDataInterface';
import PetCard from './PetCard';

interface Coords {
  lat: number;
  lng: number;
}

interface MarkerProps extends Coords {
  petData: petsData;
  petsArray: petsData[];
  keyInArr: number;
  setPetsInfoArray: React.Dispatch<React.SetStateAction<petsData[]>>
}


const PetsMarker: FC<MarkerProps> = ({ lat, lng, petData, keyInArr, petsArray, setPetsInfoArray}) => {
  const [showPetCard, setShowPetCard] = useState(false);

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
      </PetsIcon>
      {showPetCard && <PetCard setShowPetCard={setShowPetCard} petData={petData} keyInArr={keyInArr} petsArray={petsArray} setPetsInfoArray={setPetsInfoArray}/>}
    </>
  );
};

export default PetsMarker;