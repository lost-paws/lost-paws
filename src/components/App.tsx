import React, { FC, ReactNode } from 'react';
import MapContainer from '../MapContainer';
import AddPet from './AddPetButton';
import LoginButton from './LoginButton';
import Map from './TestMap';
import { petsData } from './petsDataInterface';

const App: FC = (props) => {

  const [petsInfoArray, setPetsInfoArray] = React.useState<petsData[]>([]);

  React.useEffect(() => {
    // fetch data
    const getData = async () => {
      let petsState: petsData[] = [];
      const data = await fetch('/api/v1/pets');
      const parsedData = await data.json();
      petsState = parsedData;
      setPetsInfoArray(petsState);
    }
    getData();
  }, [])

  React.useEffect(() => {
    console.log('This is petsInfoArray:', petsInfoArray)
  }, [petsInfoArray])

  return (
    <>
      <h1>all dogs go to  heaven</h1>

      {/* <MapContainer /> */}
      {/* <AddPet />
      <LoginButton /> */}
      {/* <p>{petsInfoArray[0].name}</p> */}
      { petsInfoArray.length &&
        <Map petsArray={petsInfoArray}/>
      }
    </>
  );
};

export default App;