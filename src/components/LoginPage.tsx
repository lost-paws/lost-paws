import React, {FC} from 'react';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import './LoginPage.css'


const LoginPage: FC = () => {
    let username: string;
    let password: string;

    const handleClick = () => {
        console.log(username, password)
    }

    return (
        <div className = 'loginform'>
            <Box sx={{
            width: 300,
            height: 350,
            border: '1px solid blue',
            '&:hover': {
            top: 5,
            left: 5,
            boxShadow:'5px 5px'
            }
        }}>
            <header>
                <h1>Lost Paws</h1>
                <h2>Log in to your account</h2>
            </header>
            

            <div className = 'loginFields'>
                
                <TextField fullWidth label='Username' variant='outlined' onChange={e => username = e.target.value}></TextField>
                <TextField fullWidth type='password' label='Password' variant='outlined' onChange={e => password = e.target.value}></TextField>
                <Button variant='outlined' onClick={() => handleClick()}>Login</Button>
            </div>
                
            </Box>
        </div>
    );
}

export default LoginPage;