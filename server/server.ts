import express, { Request, Response, NextFunction } from 'express';
// const express = require('express');
// const { Request, Response, NextFunction } = express;
import morgan from 'morgan';
import { db } from './models/db'
import { dbRouter } from './routers/dbrouter'

const app = express();


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


app.listen(5000, () => {
  console.log('listening on port 5000');
})

export default app;