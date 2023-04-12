import { Request, Response, NextFunction } from 'express';
import { db } from '../models/db';
import createHttpError from 'http-errors'

interface usersControllerInterface {
  fetchUsers: (req: Request, res: Response, next: NextFunction) => Promise<void>,
  fetchUser: (req: Request, res: Response, next: NextFunction) => Promise<void>,
  createUser: (req: Request, res: Response, next: NextFunction) => Promise<void>,
  updateUser: (req: Request, res: Response, next: NextFunction) => Promise<void>,
  deleteUser: (req: Request, res: Response, next: NextFunction) => Promise<void>,
}

const usersController: usersControllerInterface = {
  fetchUsers: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const allUsers = await db.query('SELECT * FROM "public"."users" LIMIT 100')
      if (!allUsers.rowCount) throw createHttpError(400, 'Users not found');
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
      if (!user.rowCount) throw createHttpError(400, 'User not found');
      res.locals.fetchedUser = user.rows[0];
      return next();
    } catch (err) {
      return next(createHttpError(400, 'Could not fetch user in userController.fetchUser'))
    }
  },

  createUser: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // destructure req.body
    const { first_name, last_name, phone_number, address, username, password, email } = req.body;
    const { first_name, last_name, phone_number, address, username, password, email } = req.body;
    // hash the password

    // make SQL command
    // const command = `
    // INSERT INTO users (first_name, last_name, username, password, phone_number, address, email)
    // OUTPUT Inserted._id
    // VALUES ($1, $2, $3, $4, $5, $6, $7)`

    const command = `
    INSERT INTO users (first_name, last_name, username, password, phone_number, address, email)
    VALUES ($1, $2, $3, $4, $5, $6, $7)returning _id;`
 
    //const command = `
    // INSERT INTO users (first_name, last_name, username, password, phone_number, address, email)
    // VALUES ($1, $2, $3, $4, $5, $6, $7); SELECT _id 
    // FROM users WHERE first_name='${first_name}' AND last_name='${last_name}'`

    const values = [first_name, last_name, username, password, phone_number, address, email];
    console.log(command, values)
    try {
      const newUser = await db.query(command, values);
      //this is where are setting the id within the rows object
      res.locals.newUser = newUser.rows[0]._id;
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
    const { first_name, last_name, phone_number, address, username, password, email } = req.body;
    const { id } = req.params;
    const command = `
    UPDATE "public"."users"
    SET first_name = $1, last_name = $2, phone_number = $3, address = $4, username = $5, password = $6, email = $7
    WHERE _id = $8`
    const values = [first_name, last_name, phone_number, address, username, password, email, id];
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
  //   } catch (error) {

  //   }
  // }

}

export default usersController;
