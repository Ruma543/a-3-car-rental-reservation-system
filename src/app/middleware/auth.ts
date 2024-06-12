import { NextFunction, Request, Response } from 'express';
import { USER_Role } from '../modules/user/user.const';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/user/user.model';

export const auth = (...requiredRoles: (keyof typeof USER_Role)[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'You have no access to this route',
      });
    }
    //add Bearer in the token
    let token;
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else {
      token = authHeader;
    }

    // const token = req.headers.authorization;

    if (!token) {
      throw new AppError(401, 'You are not authorized to access this route');
    }

    const decoded = jwt.verify(token, config.jwt_access_secret as string);

    const { role, email } = decoded as JwtPayload;

    const isUserExist = await User.findOne({ email });

    if (!isUserExist) {
      throw new AppError(401, 'User not found');
    }

    if (!requiredRoles.includes(role)) {
      throw new AppError(401, 'You are not authorized to access this route');
    }

    next();
  });
};

// export const adminMiddleware = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (req.user.role !== 'admin') {
//     return res.status(403).json({ message: 'Admin access only' });
//   }
//   next();
// };
