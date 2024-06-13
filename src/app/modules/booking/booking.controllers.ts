import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponce';
import { BookingService } from './booking.service';
import { Booking } from './booking.model';

const createBooking = catchAsync(async (req, res) => {
  const { carId, date, startTime } = req.body;
  const userId = req?.user?._id;

  const result = await BookingService.createBookingIntoDB({
    date,
    startTime,
    endTime: null,
    user: userId, // Pass the user ID
    car: carId,
    totalCost: 0,
    isBooked: 'confirmed',
  });

  console.log('result', result, userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Car booked successfully',
    data: result,
  });
});
const getAllBooking = catchAsync(async (req, res) => {
  const result = await BookingService.getAllBookingIntoDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});
const getMyBooking = catchAsync(async (req, res) => {
  const userId = req?.user?._id;
  const result = await BookingService.getMyBookingIntoDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBooking,
  getMyBooking,
  // returnCar,
};
