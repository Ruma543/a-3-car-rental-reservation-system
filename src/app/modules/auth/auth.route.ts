import express from 'express';
import { authControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();

router.post('/signup', authControllers.signUp);
router.post(
  '/signin',
  validateRequest(AuthValidation.signInValidationSchema),
  authControllers.signIn
);

export const AuthRoutes = router;
