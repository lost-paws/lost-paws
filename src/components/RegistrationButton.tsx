import React, { FC, ReactElement } from 'react';
import Button from '@mui/material/Button';




const RegistrationButton: FC = () => {

const handleRegister = (e: object) => {
  //clicking this should redirect to localhost:3000/register
}

return (
  <>
  <Button type='submit' variant="outlined" sx={{ bgcolor: 'dda15e', color: 'white', textTransform: 'capitalize', ":hover": {
      bgcolor: "#A1CDF1",
      color: "white"
    }}} onClick={ handleRegister}>Register</Button>

  </>
)

}

export default RegistrationButton;
