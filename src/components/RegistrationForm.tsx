import React, { FC, ReactElement } from 'react';
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
import RegistrationButton from './RegistrationButton';




export default function RegistrationForm() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
//display: 'flex', alignItems: 'center', justifyContent:'center', flexWrap: 'wrap', width: '100ch'
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
          label="Username"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
        />
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
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
            label="Password"
          />
        </FormControl>
        <TextField
          label="First name"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
        />
         <TextField
          label="Last name"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
        />
         <TextField
          label="Phone number"
          type='text'
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
            
          }}
        />
         <TextField
          label="Email address"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '55ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
        />
        <FormControl fullWidth sx={{ m: 1, width: '75ch'}}>
          <InputLabel htmlFor="outlined-adornment-amount">Address</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start"></InputAdornment>}
            label="Amount"
          />
        </FormControl>
      </div>
    </Box>
          <div className='submit-btn'>
          <RegistrationButton />
          </div>
    
    </>
  );
}
