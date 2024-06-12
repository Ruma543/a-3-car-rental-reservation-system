import httpStatus from 'http-status';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponce';
import { AuthServices } from './auth.service';

const signUp = catchAsync(async (req, res) => {
  const result = await AuthServices.signUpIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: result,
  });
});
const signIn = catchAsync(async (req, res) => {
  const { accessToken, refreshToken, isUserExist } =
    await AuthServices.signInIntoDB(req.body);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.node_env === 'production',
  });

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    data: isUserExist,
    token: accessToken,
  });
});
export const authControllers = {
  signUp,
  signIn,
};
