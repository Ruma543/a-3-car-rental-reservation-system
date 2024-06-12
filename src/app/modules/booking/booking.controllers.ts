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
// const returnCar = catchAsync(async (req, res) => {
//   const booking = await Booking.findById(bookingId).populate('car');
//   if (!booking) {
//     throw new Error('Booking not found');
//   }

//   booking.endTime = endTime;

//   // Calculate total cost
//   const startTime = new Date(`1970-01-01T${booking.startTime}:00`);
//   const endTimeDate = new Date(`1970-01-01T${endTime}:00`);
//   const durationHours =
//     (endTimeDate.getTime() - startTime.getTime()) / (1000 * 60 * 60);
//   booking.totalCost = durationHours * booking.car.pricePerHour;

//   // Update car status to available
//   const car = booking.car;
//   car.status = 'available';

//   await booking.save();
//   await car.save();

//   return booking;
// });
export const BookingControllers = {
  createBooking,
  getAllBooking,
  getMyBooking,
  returnCar,
};
