import React, { FC } from 'react';
import './LoginButton.css';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';




const LoginButton: FC = () => {
  const navigate = useNavigate()

  return (
    <Button variant="contained" sx={{ bgcolor: 'dda15e',  ":hover": {
      bgcolor: "#A1CDF1",
      color: "white"
    }}} onClick={() => navigate('/login')}>Login to your account</Button>
  );
};

export default LoginButton;