import React, { FC } from 'react';
import { useRouteError } from "react-router-dom"


const ErrorPage: FC = () => {
    const error = useRouteError();
    

  return (
    <div id="error-page">
    <h1>THIS IS AN ERROR PAGE</h1>
    </div>
  );
};

export default ErrorPage