import express, { Router, Request, Response, NextFunction } from 'express';
import db from '../models/db'

const router: Router = express.Router();

router.post('/test', async (req: Request, res: Response) => {
  try {
    const createTableString = `
    CREATE TABLE test (
      id SERIAL PRIMARY KEY,
      test VARCHAR(255) UNIQUE NOT NULL
    )
    `;
    const result= await db.query(createTableString)
    console.log('This is the result:', result);
    res.send(result); 
  } catch(error) {
    console.error('Error creating test table:', error);
    throw error;
  }
})


export default router;