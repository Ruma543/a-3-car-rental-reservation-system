import AppError from '../../errors/AppError';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { TSignInUser } from './auth.interface';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { createToken } from './auth.utils';
import config from '../../config';

const signUpIntoDB = async (payload: TUser) => {
  //check user existence
  const user = await User.findOne({ email: payload.email });

  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'this User already exists');
  }

  // user create
  const newUser = await User.create(payload);

  return newUser;
};

const signInIntoDB = async (payload: TSignInUser) => {
  const isUserExist = await User.findOne({ email: payload.email }).select(
    '+password'
  );

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User not found');
  }

  //check the password is right or not
  // console.log('payload password', payload.password);
  // console.log('is exist password', isUserExist.password);
  const isPasswordMatch = await bcrypt.compare(
    payload.password,
    isUserExist.password
  );

  // console.log('password match', isPasswordMatch);
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'this password is not matched !');
  }

  const jwtPayload = {
    email: isUserExist.email,
    role: isUserExist.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_secret_expire_in as string
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_secret_expire_in as string
  );

  return {
    accessToken,
    refreshToken,
    isUserExist,
  };
};
export const AuthServices = {
  signUpIntoDB,
  signInIntoDB,
};
