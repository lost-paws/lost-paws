import { Request, Response, NextFunction } from 'express';
import { db } from '../models/db';
import createHttpError from 'http-errors'
import dayjs = require('dayjs');

interface petsControllerInterface {
  fetchPets: (req: Request, res: Response, next: NextFunction) => Promise<void>,
  fetchPet: (req: Request, res: Response, next: NextFunction) => Promise<void>,
  createPet: (req: Request, res: Response, next: NextFunction) => Promise<void>,
  updatePet: (req: Request, res: Response, next: NextFunction) => Promise<void>,
  deletePet: (req: Request, res: Response, next: NextFunction) => Promise<void>,
}

const petsController: petsControllerInterface = {
  fetchPets: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // this query will return all pets and return their lat and lng coordinates
    // consider adding a where claus to filter for pets within a certain radius
    const query = `
    SELECT * FROM pets`

    try {
      const allPets = await db.query(query);
      // iterate through allPets.rows and convert each image value into base 64
      allPets.rows.forEach((pet) => {
        pet.image = pet.image.toString('base64');
      })
      console.log(allPets.rows)
      res.locals.fetchedPets = allPets.rows;
      // console.log('These are the rows:', res.locals.fetchedPets)
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
      // console.log(pet);
      if (!pet.rowCount) throw createHttpError(400, 'Pet not found');
      res.locals.fetchedPet = pet.rows[0];
      return next();
    } catch (err) {
      return next(createHttpError(400, 'Could not fetch pet in petsController.fetchPet'));
    }
  },

  createPet: async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    console.log('This is req.file', req.file);
    console.log('This is req.body', req.body);

    const {
      owner_id,
      name,
      date_last_seen,
      address,
      species,
      breed,
      description
    } = req.body;
    const { lat, lng } = res.locals.coords;
    const fakeOwnerId = 2;
    const dateString = date_last_seen.split(' ').slice(1, 4).join(' ');
    const imageBuffer = req.file?.buffer;
    const command = `
    INSERT INTO pets (owner_id, name, date_last_seen, address, lat, lng, species, breed, description, image)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
    const values = [fakeOwnerId, name, dateString, address, lat, lng, species, breed, description, imageBuffer];
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
      owner_id,
      name,
      date_last_seen,
      address,
      species,
      breed,
      description
    } = req.body;
    
    const { lat, lng } = res.locals.coords;
    const { id } = req.params;
    const command = `
    UPDATE "public"."pets"
    SET name = $1, date_last_seen = $2, lat = $3, lng = $4, address = $5, species = $6, breed = $7, description = $8
    WHERE _id = $9`
    const values = [name, date_last_seen, lat, lng, address, species, breed, description, id];
    try {
      await db.query(command, values);
      return next();
    } catch (err) {
      return next(createHttpError(400, 'Could not update pet in petsController.updatePet',));
    }
  }

};



export default petsController;