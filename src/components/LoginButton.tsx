import React, { FC } from 'react';
import './LoginButton.css';
import Button from '@mui/material/Button';

function handleClick (){
    console.log('will take you to the login page')
}

const LoginButton: FC = () => {
  return (
    <Button variant="contained" sx={{ bgcolor: 'dda15e',  ":hover": {
      bgcolor: "#A1CDF1",
      color: "white"
    }}} onClick={() => handleClick()}>Login</Button>
  );
};

export default LoginButton;