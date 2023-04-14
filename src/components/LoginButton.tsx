import React, { FC } from 'react';
import './LoginButton.css';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';




const LoginButton: FC = () => {
  const navigate = useNavigate()

  return (
    <Button variant="contained" sx={{ 
      bgcolor: 'dda15e',  
      position: "fixed", 
      top: 10, 
      right: 115.5, 
      zIndex: 2000,
      ":hover": {
      bgcolor: "#A1CDF1",
      color: "white"
    }}} onClick={() => navigate('/login')}>Login</Button>
  );
};

export default LoginButton;