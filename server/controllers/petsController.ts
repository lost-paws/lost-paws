import { Request, Response, NextFunction } from 'express';
import { db } from '../models/db';
import createHttpError from 'http-errors'

interface petsControllerInterface {
  fetchPets: (req: Request, res: Response, next: NextFunction) => Promise<void>,
  fetchPet: (req: Request, res: Response, next: NextFunction) => Promise<void>,
  createPet: (req: Request, res: Response, next: NextFunction) => Promise<void>,
  updatePet: (req: Request, res: Response, next: NextFunction) => Promise<void>,
  deletePet: (req: Request, res: Response, next: NextFunction) => Promise<void>,
}

const petsController: petsControllerInterface = {
  fetchPets: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const allPets = await db.query('SELECT * FROM "public"."pets" LIMIT 100');
      res.locals.fetchedPets = allPets.rows;
      if (!allPets.rowCount) throw createHttpError(400, 'Pet not found');
      return next();
    } catch (err) {
      return next(createHttpError(400, 'Could not fetch all pets in petsController.fetchPets'));
    }
  },

  fetchPet: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    try {
      const command = 'SELECT * FROM "public"."pets" WHERE _id = $1';
      const values = [id];
      const pet = await db.query(command, values);
      console.log(pet);
      if (!pet.rowCount) throw createHttpError(400, 'Pet not found');
      res.locals.fetchedPet = pet.rows[0];
      return next();
    } catch (err) {
      return next(createHttpError(400, 'Could not fetch pet in petsController.fetchPet'));
    }
  },

  createPet: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
      owner_id,
      name,
      date_last_seen,
      loc_last_seen,
      species,
      breed,
      description
    } = req.body;

    const command = `
    INSERT INTO pets (owner_id, name, date_last_seen, loc_last_seen, species, breed, description)
    VALUES ($1, $2, $3, $4, $5, $6, $7)`;
    const values = [owner_id, name, date_last_seen, loc_last_seen, species, breed, description];
    try {
      const newPet = await db.query(command, values);
      res.locals.newPet = newPet;
      return next();
    } catch (err) {
      return next(createHttpError(400, 'Could not create pet in petsController.createPet'));
    }
  },

  deletePet: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const command = 'DELETE FROM pets WHERE _id = $1';
    const values = [id];
    try {
      const deletedPet = await db.query(command, values);
      res.locals.deletedPet = deletedPet.rowCount;
      return next();
    } catch (err) {
      return next(createHttpError(400, 'Could not delete pet in petsController.deletePet'))
    }
  },

  updatePet: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
      name,
      date_last_seen,
      loc_last_seen,
      species,
      breed,
      description
    } = req.body;
    const { id } = req.params;
    const command = `
    UPDATE "public"."pets"
    SET name = $1, date_last_seen = $2, loc_last_seen = $3, species = $4, breed = $5, description = $6
    WHERE _id = $7`
    const values = [name, date_last_seen, loc_last_seen, species, breed, description, id];
    try {
      const updatedPet = await db.query(command, values);
      res.locals.updatedPet = updatedPet;
      return next();
    } catch (err) {
      return next(createHttpError(400, 'Could not update pet in petsController.updatePet'));
    }
  }

};



export default petsController;