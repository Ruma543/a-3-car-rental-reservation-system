import express from 'express';
import { CarControllers } from './car.controller';
import { auth } from '../../middleware/auth';
import { USER_Role } from '../user/user.const';
import { BookingControllers } from '../booking/booking.controllers';

const router = express.Router();

router.post(
  '/',
  auth(USER_Role.admin),
  // validateRequest(CourseValidation.createCourseValidationSchema),
  CarControllers.createCar
);
router.get(
  '/',
  // auth('student', 'faculty', 'admin'),
  CarControllers.getAllCars
);

router.get(
  '/:id',
  // auth('student', 'faculty', 'admin'),
  CarControllers.getSingleCar
);

router.put(
  '/:id',
  auth(USER_Role.admin),
  // validateRequest(CourseValidation.updateCourseValidationSchema),
  CarControllers.updateSingleCar
);
// router.put(
//   '/return',
//   auth(USER_Role.admin),
//   // validateRequest(CourseValidation.updateCourseValidationSchema),
//   // CarControllers.updateSingleCar
//   BookingControllers.returnCar
// );
router.delete('/:id', auth(USER_Role.admin), CarControllers.deleteCar);

export const CarRoutes = router;
