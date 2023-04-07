import React, { FC } from 'react';
import './LoginButton.css';

function handleClick (){
    console.log('will take you to the login page')
}

const LoginButton: FC = () => {
  return (
    <button className='login' onClick={() => handleClick()}>Login</button>
  );
};

export default LoginButton;