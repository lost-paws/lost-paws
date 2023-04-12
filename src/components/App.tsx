import React, { FC } from 'react';
import MapContainer from './MapContainer';
import LoginButton from './LoginButton';
import Registration from './RegistrationButton';
import RegistrationPage from './RegistrationForm';
import RegistrationButton from './RegistrationButton';
import AddPet from './AddPetButton';
import Map from './TestMap';
import { LocalizationProvider } from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'



import { withCookies } from 'react-cookie';






const App: FC = (props) => {
  
  return (
    <>
      <h1>all dogs go to  heaven</h1>
      <LocalizationProvider>
        <MapContainer />
        <AddPet />
        <LoginButton />
        <RegistrationButton />
      </LocalizationProvider>
    </>
  );
};

export default App;