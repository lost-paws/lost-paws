import React, { FC } from 'react';
import { useRouteError } from "react-router-dom"
import RegistrationForm from './components/RegistrationForm';


const Register: FC = () => {
    const error = useRouteError();
    

  return (
    <>
     <div id="registration">
    <h1>Registration</h1>
    </div>
    <RegistrationForm />
    </>
   
  );
};

export default Register