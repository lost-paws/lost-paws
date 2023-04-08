import React, { FC, ReactElement } from 'react';
import Button from '@mui/material/Button';




const RegistrationButton: FC = () => {
return (
  <>
  <Button variant="outlined" sx={{ bgcolor: 'dda15e', color: 'white', textTransform: 'capitalize', ":hover": {
      bgcolor: "#A1CDF1",
      color: "white"
    }}} onClick={() => console.log('test')}>Register</Button>

  </>
)

}

export default RegistrationButton;
