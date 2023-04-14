import express, { Express, Request, Response, NextFunction } from 'express';
// const express = require('express');
// const { Request, Response, NextFunction } = express;
import morgan from 'morgan';
import { isHttpError } from 'http-errors';
import usersRouter from './routers/usersRouter'
import petsRouter from './routers/petsRouter'
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app: Express = express();


// UTILITY ROUTES
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser())
// UNPROTECTED ROUTES
app.get('/', (req: Request, res: Response) => {
  res.send('hello');
})

// PROTECTED ROUTES
  // router for each table in the db (pets, users, sessions, comments)
  // route format: '/api/v1/<route_name>
  app.use('/api/v1/users', usersRouter);
  app.use('/api/v1/pets', petsRouter);

// 404 HANDLER

// GLOBAL ERROR HANDLER
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = 'An error occurred in unknown express middleware';
  let statusCode = 400;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage })
})


app.listen(8000, () => {
  console.log('listening on port 8000...');
})

export default app;