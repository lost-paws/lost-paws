import express, { Router, Request, Response, NextFunction } from 'express';
import petsController from '../controllers/petsController';
import googleMapsController from '../controllers/googleMapsController';
import multer from 'multer';

const upload = multer({storage: multer.memoryStorage()});


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
router.post('/', upload.single('file'), googleMapsController.addressToLatLng, petsController.createPet, petsController.fetchPets, (req: Request, res: Response) => {
  res.status(201).json(res.locals.fetchedPets);
});
// update an existing pet
router.patch('/:id', googleMapsController.addressToLatLng, petsController.updatePet, petsController.fetchPets, (req: Request, res: Response) => {
  res.status(200).json(res.locals.fetchedPets);
})
// delete a pet
router.delete('/:id', petsController.deletePet, petsController.fetchPets, (req: Request, res: Response) => {
  res.status(200).json(res.locals.fetchedPets);
});

export default router;