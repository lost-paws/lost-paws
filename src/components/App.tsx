import React, { FC } from 'react';
import MapContainer from '../MapContainer';
import AddPet from './AddPetButton';
import LoginButton from './LoginButton';
import Map from './TestMap';

const App: FC = (props) => {
  
  return (
    <>
      <h1>all dogs go to  heaven</h1>

      <MapContainer />
      <AddPet />

      <LoginButton />
      <Map/>

    </>
  );
};

export default App;