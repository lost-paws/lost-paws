import { Request, Response, NextFunction } from 'express';
import { db } from '../models/db';
import createHttpError from 'http-errors'

const usersController = {
  fetchUsers: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const allUsers = await db.query('SELECT * FROM "public"."users" LIMIT 100')
      res.locals.fetchedUsers = allUsers.rows;
      return next()
    } catch (err) {
      return next(createHttpError(400, 'Could not fetch all users in usersController.fetchUsers'))
    }
  },

  fetchUser: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const values = [req.params.id];
      const user = await db.query('SELECT * FROM "public"."users" WHERE _id = $1', values)
      res.locals.fetchedUser = user.rows;
      return next();
    } catch (err) {
      return next(createHttpError(400, 'Could not fetch user in userController.fetchUser'))
    }
  },

  createUser: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // destructure req.body
    const { firstName, lastName, phoneNumber, address, username, password, email } = req.body;
    // hash the password

    // make SQL command
    const command = `
    INSERT INTO users (first_name, last_name, username, password, phone_number, address, email)
    VALUES ($1, $2, $3, $4, $5, $6, $7)`
    const values = [firstName, lastName, username, password, phoneNumber, address, email];
    try {
      const newUser = await db.query(command, values);
      res.locals.newUser = newUser;
      return next()
    } catch (err) {
      return next(createHttpError(400, 'Could not create user in usersController.createUser'))
    }
  },

  deleteUser: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const command = `DELETE FROM users WHERE _id = $1`
    const values = [req.params.id]
    try {
      const deletedUser = await db.query(command, values);
      res.locals.deletedUser = deletedUser.rowCount;
      return next();
    } catch (err) {
      return next(createHttpError(400, 'Could not delete user in usersController.deleteUsers'))
    }
  },

  updateUser: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { firstName, lastName, phoneNumber, address, username, password, email } = req.body;
    const { id } = req.params;
    const command = `
    UPDATE "public"."users"
    SET first_name = $1, last_name = $2, phone_number = $3, address = $4, username = $5, password = $6, email = $7
    WHERE _id = $8`
    const values = [firstName, lastName, phoneNumber, address, username, password, email, id];
    try {
      const updatedUser = await db.query(command, values);
      res.locals.updatedUser = updatedUser;
      return next();
    } catch (error) {
      return next(createHttpError(400, 'Could not update user in usersController.updateUser'));
    }
  },
  // verifyUser: async( req: Request, res: Response, next: NextFunction): Promise<void> => {
  //   const { username, password } = req.body;
  //   try {
  //     // query users table for a user whose username matches
  //     // use bcrypt.compare to check if password matches password in db
  //       // this is an async func that returns a boolean
  //   }
  // }

}

export default usersController;
