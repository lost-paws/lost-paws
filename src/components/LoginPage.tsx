import React, {FC} from 'react';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import './LoginPage.css'


const LoginPage: FC = () => {
    return (
        <div className = 'loginform'>
            <Box sx={{
            width: 250,
            height: 300,
            border: '1px solid blue',
            '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],
            }
        }}>
            <div className = 'loginFields'>
                <TextField label='Username' variant='outlined'></TextField>
                <TextField label='Password' variant='outlined'></TextField>
                <Button variant='outlined'>Login</Button>
            </div>
                
            </Box>
        </div>
    );
}

export default LoginPage;