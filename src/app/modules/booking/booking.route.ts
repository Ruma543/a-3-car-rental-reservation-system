import express from 'express';

// import { auth } from '../../middleware/auth';
import { BookingControllers } from './booking.controllers';
import { auth } from '../../middleware/auth';
import { USER_Role } from '../user/user.const';

const router = express.Router();

router.post(
  '/',
  auth(USER_Role.user),
  // validateRequest(CourseValidation.createCourseValidationSchema),
  BookingControllers.createBooking
);
router.get('/', auth(USER_Role.admin), BookingControllers.getAllBooking);

router.get(
  '/my-bookings',
  auth(USER_Role.user),
  BookingControllers.getMyBooking
);

router.put('/return', auth(USER_Role.admin), BookingControllers.returnCar);
// router.put(
//   '/:id',
//   auth(USER_Role.admin),
//   // validateRequest(CourseValidation.updateCourseValidationSchema),
//   CarControllers.updateSingleCar
// );

// router.delete('/:id', auth(USER_Role.admin), CarControllers.deleteCar);

export const BookingRoutes = router;
