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
    console.log(authHeader);
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'You have no access to this route',
      });
    }
    //add Bearer in the token
    let token;
    if (authHeader.startsWith('Bearer')) {
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

    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError(401, 'User not found');
    }
    // if (requiredRoles.length && !requiredRoles.includes(user.role)) {
    //   throw new AppError(403, 'You are not authorized to access this route');
    // }
    // if (requiredRoles && !user.role.includes(requiredRoles)) {
    //   throw new AppError(403, 'You are not authorized to access this route');
    // }

    if (!requiredRoles.includes(role)) {
      throw new AppError(401, 'You are not authorized to access this route');
    }
    req.user = user;

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
