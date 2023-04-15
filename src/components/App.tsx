import React, { FC, ReactNode } from 'react';
import MapContainer from './MapContainer';
import LoginButton from './LoginButton';
import Registration from './RegistrationButton';
import RegistrationPage from './RegistrationForm';
import RegistrationButton from './RegistrationButton';
import AddPet from './AddPetButton';
import Map from './OldTestMap';
import { LocalizationProvider } from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import { withCookies } from 'react-cookie';
import './App.css';




const App: FC = (props) => {


  return (
    <>
      <h1 className='lost_paws'>Lost Paws</h1>
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