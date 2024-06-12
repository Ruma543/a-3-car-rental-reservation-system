import express from 'express';
import { CarControllers } from './car.controller';
import { auth } from '../../middleware/auth';
import { USER_Role } from '../user/user.const';

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
//   '/:courseId/assign-faculties',
//   validateRequest(CourseValidation.assignFacultiesValidationSchema),
//   CourseControllers.assignFacultiesWithCourse
// );
// router.delete(
//   '/:courseId/remove-faculties',
//   auth('admin'),
//   validateRequest(CourseValidation.assignFacultiesValidationSchema),
//   CourseControllers.removeFacultiesFromCourse
// );
router.delete('/:id', auth(USER_Role.admin), CarControllers.deleteCar);

export const CarRoutes = router;
