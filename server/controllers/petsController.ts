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
    // this query will return all pets and return their lat and lng coordinates
    // consider adding a where claus to filter for pets within a certain radius
    const query = `
    SELECT 
    ST_Y(loc_last_seen::geometry) AS lat, 
    ST_X(loc_last_seen::geometry) AS lng,
    _id, owner_id, date_last_seen, species, breed, name, description, img_src
    FROM pets`

    try {
      const allPets = await db.query(query);
      res.locals.fetchedPets = allPets.rows;
      console.log('These are the rows:', res.locals.fetchedPets)
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

    /* 
    depending on how we want to implement client-side pin-setting, may need to look into:
    -- google maps geocoding api (if we want do user-input address-based): https://developers.google.com/maps/documentation/javascript/geocoding
    -- getting lat and lon based on where the pin is: https://stackoverflow.com/questions/5968559/retrieve-latitude-and-longitude-of-a-draggable-pin-via-google-maps-api-v3

    !!!! in either case:
    for reference: before the query is submitted, loc_last_seen MUST be in this format:

    "SRID=4326;POINT(longitude latitude)"

    There should be NO comma betwen log and lat
    Remember that google maps generates them in the reverse order (lat lng), so they must be flipped to fit the posgis geogrpaphy data type
    
    video: https://www.youtube.com/watch?v=7IUBABSWgcE&t=343s
    find pins within a given radius: https://postgis.net/docs/ST_DWithin.html

    example req.body that works through postman:
    {
    "owner_id": 2,
    "name": "Phillip",
    "date_last_seen": "2023-04-01",
    "loc_last_seen": "SRID=4326;POINT(-78.97814774767755 35.98060898687071)",
    "species": "Star nosed mole",
    "breed": "Star nosed mole",
    "description": "He is small with a star nose. He has huge, terrifying claws capable of doing immeasurable harm."
    } 

    */

    const {
      owner_id,
      name,
      date_last_seen,
      loc_last_seen,
      species,
      breed,
      description
    } = req.body;

    const { lat, lng } = loc_last_seen;
    const geo = `SRID=4326;POINT(${lng} ${lat})`

    const command = `
    INSERT INTO pets (owner_id, name, date_last_seen, loc_last_seen, species, breed, description)
    VALUES ($1, $2, $3, $4, $5, $6, $7)`;
    const values = [owner_id, name, date_last_seen, geo, species, breed, description];
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