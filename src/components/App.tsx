import React, { FC } from 'react';
import MapContainer from './MapContainer';
import LoginButton from './LoginButton';
import Registration from './RegistrationButton';
import RegistrationPage from './RegistrationForm';
import RegistrationButton from './RegistrationButton';
import AddPet from './AddPetButton';
import Map from './TestMap';



import { withCookies } from 'react-cookie';






const App: FC = (props) => {
  
  return (
    <>
      <h1>all dogs go to  heaven</h1>

      <MapContainer />
      <AddPet />

      <LoginButton />
      <RegistrationButton />
      <Map />

    </>
  );
};

export default App;