import express, { Router, Request, Response, NextFunction } from 'express';
import { db } from '../models/db'
import usersController from '../controllers/usersController';

const router: Router = express.Router();

// get all users
router.get('/', usersController.fetchUsers, (req: Request, res: Response) => {
  res.status(200).json(res.locals.fetchedUsers);
})
// get a user
router.get('/:id', usersController.fetchUser, (req: Request, res: Response) => {
  res.status(200).json(res.locals.fetchedUser);
})

// create a new user
router.post('/', usersController.createUser, (req: Request, res: Response) => {
  res.status(201).json(res.locals.newUser)
})
// update an existing user
router.patch('/:id', usersController.updateUser, (req: Request, res: Response) => {
  res.status(200).json(res.locals.updatedUser);
})
// delete a user
router.delete('/:id', usersController.deleteUser, (req: Request, res: Response) => {
  res.status(200).json(res.locals.deletedUser);
})

export default router;