import QueryBuilder from '../../builder/queryBuilder';
import { Car } from '../car/car.model';
import { User } from '../user/user.model';
import { bookingSearchableFields } from './booking.const';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';

const createBookingIntoDB = async (payload: TBooking) => {
  const car = await Car.findOne({ _id: payload.car, isDeleted: false });
  console.log('car in services', car);
  if (!car) {
    throw new Error('Car not found or is deleted');
  }

  // Ensure the user exists
  const user = await User.findById(payload.user);
  if (!user) {
    throw new Error('User not found');
  }
  console.log('user in service', user);

  // Create the booking
  const booking = new Booking({
    ...payload,
    isBooked: 'confirmed',
  });
  await booking.save();

  // Update car status to unavailable
  car.status = 'unavailable';
  await car.save();

  // Populate user and car details

  const result = (await booking.populate('user')).populate('car');

  return result;
};
const getAllBookingIntoDB = async (query: Record<string, unknown>) => {
  const bookingQuery = new QueryBuilder(Booking.find(), query)
    .search(bookingSearchableFields)
    .filter()
    .paginate()
    .sort()
    .fields();
  // const result = await carQuery.modelQuery;
  const result = await bookingQuery.modelQuery.populate('user').populate('car');
  return result;
};
const getMyBookingIntoDB = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const bookings = await Booking.find({ user: userId })
    .populate('user')
    .populate('car');
  return bookings;
};
// const returnCarIntoDB = async (bookingId: string, endTime: string) => {
//   // Find the booking by ID
//   const booking = await Booking.findById(bookingId).populate('car');
//   if (!booking) {
//     throw new Error('Booking not found');
//   }
//   console.log('return booking', 'booking');
//   // Update the end time of the booking
//   booking.endTime = endTime;

//   // Calculate total cost
//   const startTime = parseFloat(booking.startTime.replace(':', '.'));
//   const endHour = parseFloat(endTime.replace(':', '.'));
//   const duration = endHour - startTime;
//   const totalCost = duration * booking?.car?.pricePerHour;
//   booking.totalCost = totalCost;

//   // Update car status to available
//   const car = await Car.findById(booking.car._id);
//   car.status = 'available';
//   await car.save();

//   // Save the updated booking
//   await booking.save();

//   // Populate user and car details
//   await booking.populate('user').populate('car');

//   return booking;
// };
export const BookingService = {
  createBookingIntoDB,
  getAllBookingIntoDB,
  getMyBookingIntoDB,
  returnCarIntoDB,
};
