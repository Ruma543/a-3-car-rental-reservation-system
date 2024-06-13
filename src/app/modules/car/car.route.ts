import express from 'express';
import { CarControllers } from './car.controller';
import { auth } from '../../middleware/auth';
import { USER_Role } from '../user/user.const';
import validateRequest from '../../middleware/validateRequest';
import { CarValidation } from './car.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_Role.admin),
  validateRequest(CarValidation.createCarValidationSchema),
  CarControllers.createCar
);
router.get('/', CarControllers.getAllCars);

router.get('/:id', CarControllers.getSingleCar);
//use before dynamic id otherwise arise an issue
router.put('/return', auth(USER_Role.admin), CarControllers.returnCar);
router.put(
  '/:id',
  auth(USER_Role.admin),
  validateRequest(CarValidation.updateCarValidationSchema),
  CarControllers.updateSingleCar
);

router.delete('/:id', auth(USER_Role.admin), CarControllers.deleteCar);

export const CarRoutes = router;
