import React, { FC, ReactElement } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";




const RegistrationButton: FC = () => {
  const navigate = useNavigate();

const handleRegister = (e: object) => {
  //clicking this should redirect to localhost:3000/register
  navigate('/register');
}

return (
  <>
  <Button type='submit' variant="outlined" sx={{ 
    bgcolor: 'dda15e',
    color: 'white', 
    textTransform: 'capitalize', 
    position: "fixed", 
    top: 10, 
    right: 26.4, 
    
    zIndex: 2000,
     ":hover": {
      bgcolor: "#A1CDF1",
      color: "white"
    }}} onClick={ handleRegister}>Register</Button>

  </>
)

}

export default RegistrationButton;
