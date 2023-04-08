import express, { Express, Request, Response, NextFunction } from 'express';
// const express = require('express');
// const { Request, Response, NextFunction } = express;
import morgan from 'morgan';
import { db } from './models/db'
import { dbRouter } from './routers/dbrouter'

const app: Express = express();


// UTILITY ROUTES
app.use(morgan('dev'));
app.use(express.json());

// UNPROTECTED ROUTES
app.get('/', (req: Request, res: Response) => {
  res.send('hello');
})

// app.use('/test', dbRouter);

// PROTECTED ROUTES

// 404 HANDLER

// GLOBAL ERROR HANDLER


app.listen(8000, () => {
  console.log('listening on port 8000');
})

export default app;