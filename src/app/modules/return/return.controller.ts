import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponce';
import catchAsync from '../../utils/catchAsync';
import { ReturnService } from './return.service';

const returnCar = catchAsync(async (req, res) => {
  const { bookingId, endTime } = req.body;

  const result = await ReturnService.returnCarIntoDB(bookingId, endTime);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car booked successfully',
    data: result,
  });
});
export const ReturnController = {
  returnCar,
};
