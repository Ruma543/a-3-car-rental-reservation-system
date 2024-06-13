import express from 'express';

import { auth } from '../../middleware/auth';
import { USER_Role } from '../user/user.const';
import { ReturnController } from './return.controller';

const router = express.Router();

router.put('/return', auth(USER_Role.admin), ReturnController.returnCar);

export const ReturnRoutes = router;
