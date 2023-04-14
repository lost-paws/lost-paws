import React, { FC } from 'react';

interface Coords {
  lat: number;
  lng: number;
}

interface ButtonProps extends Coords {
  text?: string;
}

const Button: FC<ButtonProps> = ({ lat, lng, text }) => {
  return (
    <button
      onClick={() => {
        console.log('THIS HAS BEEN CLICKED');
      }}
    >
      {text || 'CLICK THIS'}
    </button>
  );
};

export default Button;