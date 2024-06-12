import express from 'express';
import { authControllers } from './auth.controller';

const router = express.Router();

router.post('/signup', authControllers.signUp);
router.post('/signin', authControllers.signIn);

export const AuthRoutes = router;
