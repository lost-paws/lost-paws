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
app.use(express.json({limit:'50mb'}));
app.use(cookieParser());
app.use(express.urlencoded({limit:'50mb'}))
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
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ rror: 'This page does not exist' })
})
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