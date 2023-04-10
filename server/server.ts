import express, { Express, Request, Response, NextFunction, ErrorRequestHandler } from 'express';
// const express = require('express');
// const { Request, Response, NextFunction } = express;
import morgan from 'morgan';
import { isHttpError } from 'http-errors';
import { db } from './models/db'
import { dbRouter } from './routers/dbrouter'
import usersRouter from './routers/usersRouter'
import petsRouter from './routers/petsRouter'

const app: Express = express();


// UTILITY ROUTES
app.use(morgan('dev'));
app.use(express.json());

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