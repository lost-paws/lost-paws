import express, { Router, Request, Response, NextFunction } from 'express';
import petsController from '../controllers/petsController';
import googleMapsController from '../controllers/googleMapsController';

const router: Router = express.Router();

// get all pets
router.get('/', petsController.fetchPets, (req: Request, res: Response) => {
  res.status(200).json(res.locals.fetchedPets);
});
// get a pet
router.get('/:id', petsController.fetchPet, (req: Request, res: Response) => {
  res.status(200).json(res.locals.fetchedPet);
});
// create a new pet
router.post('/', googleMapsController.addressToLatLng, petsController.createPet, (req: Request, res: Response) => {
  res.status(201).json(res.locals.newPet);
});
// update an existing pet
router.patch('/:id', googleMapsController.addressToLatLng, petsController.updatePet, (req: Request, res: Response) => {
  res.status(200).json(res.locals.updatedPet);
})
// delete a pet
router.delete('/:id', petsController.deletePet, (req: Request, res: Response) => {
  res.status(200).json(res.locals.deletedPet);
});

export default router;