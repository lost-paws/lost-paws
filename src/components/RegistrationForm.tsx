import React, { FC, ReactElement, useEffect, useState } from 'react';
import RegistrationFinder from '../apis/RegistrationFinder';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import './RegistrationPage.css';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import { ReportProblem } from '@mui/icons-material';
import { report } from 'process';


// import { useNavigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


import Cookies from 'universal-cookie';






export default function RegistrationForm() {

//setting the redirect when a user clicks register
const navigate = useNavigate();

//setting the cookie

//setCookie();

const [username, setUserName] = useState('');
const [password, setPassword] = useState('');
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [phoneNumber, setPhoneNumber ] = useState('');
const [email, setEmail ] = useState('');
const [address, setAddress] = useState('');
//cookie validation




  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    
  };



//BUTTON THAT HANDLES THE REGISTER ON OUR REGISTRATION PAGE
  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
  
    e.preventDefault()
    try {
      
      const response = await RegistrationFinder.post('/', {
        username: username,
        password: password,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        email: email,
        address: address
      });
      console.log('this is my response', response)
      //UNCOMMENT THIS TO HAVE REDIRECT
      //navigate('/')
      
      
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
  <HomeIcon className='home-btn'/>
    <h1 className='register'>Register</h1>
    <Box sx={{ 
      containerDirection: 'column', 
      alignItems:'center', 
      justifyContent: 'center',
      marginTop: '80px',
      marginRight: '200px',
      marginLeft: '420px',
      width: '80ch',

      
      }}>
      <div>
        <TextField
          label="username"
          value={username}
          onChange={e => setUserName(e.target.value)}
          id="username"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
        />
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          

          />
        </FormControl>
        <TextField
          label="first name"
          id="first-name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
        />
         <TextField
          label="last name"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          id="last-name"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
        />
         <TextField
          label="phone number"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
          type='text'
          id="phone-number"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
            
          }}
        />
         <TextField
          label="email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          id="email"
          sx={{ m: 1, width: '55ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
        />
        <FormControl fullWidth sx={{ m: 1, width: '75ch'}}>
          <InputLabel htmlFor="">address</InputLabel>
          <OutlinedInput
            id="address"
            startAdornment={<InputAdornment position="start"></InputAdornment>}
            label="address"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </FormControl>
      </div>
    </Box>
          <div className='submit-btn'>
          <Button  type='submit' variant="outlined" sx={{ bgcolor: 'dda15e', color: 'white', textTransform: 'capitalize', ":hover": {
      bgcolor: "#A1CDF1",
      color: "white"
    }}} onClick={handleRegister}>Register</Button>
          </div>
    
    </>
  );
}
