import QueryBuilder from '../../builder/queryBuilder';
import AppError from '../../errors/AppError';
import { Booking } from '../booking/booking.model';
import { carSearchableFields } from './car.const';
import { TCar } from './car.interface';
import { Car } from './car.model';

const createCarIntoDB = async (payload: TCar) => {
  const result = await Car.create(payload);
  return result;
};
const getAllCarIntoDB = async (query: Record<string, unknown>) => {
  const carQuery = new QueryBuilder(Car.find({ isDeleted: false }), query)
    .search(carSearchableFields)
    .filter()
    .paginate()
    .sort()
    .fields();
  const result = await carQuery.modelQuery;
  return result;
};
const getSingleCarIntoDB = async (id: string) => {
  const result = await Car.findOne({ _id: id, isDeleted: false });
  return result;
};

const updateCarIntoDB = async (id: string, payload: Partial<TCar>) => {
  const result = await Car.findByIdAndUpdate(id, payload, { new: true });
  return result;
};
const deleteCarFromDB = async (id: string) => {
  const car = await Car.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  if (!car) {
    throw new AppError(401, 'car not found');
  }
  return car;
};
const returnCarIntoDB = async (
  bookingId: string,
  // bookingId: string,
  endTime: string
) => {
  // Find the booking by ID
  // console.log(bookingId);
  // const booking = await Booking.findById(bookingId);
  const booking: any = await Booking.findByIdAndUpdate(
    bookingId,
    { endTime },
    { new: true }
  )
    .populate('car')
    .populate('user');

  if (!booking) {
    throw new Error('Booking not found');
  }
  // console.log(booking.car);
  const startTimes = booking.startTime;
  const endTimes = booking.endTime;
  const pricePerHour = (booking.car as { pricePerHour: number }).pricePerHour;
  // console.log(pricePerHour, startTimes, endTimes);

  //Convert startTime and endTime to hours
  const startHour =
    parseInt(startTimes.split(':')[0], 10) +
    parseInt(startTimes.split(':')[1], 10) / 60;
  const endHour =
    parseInt(endTimes.split(':')[0], 10) +
    parseInt(endTimes.split(':')[1], 10) / 60;

  // Calculate the duration in hours
  const durationInHours = endHour - startHour;

  // Calculate the total cost
  const totalCost = Math.floor(durationInHours * pricePerHour);
  // console.log('hour', durationInHours, totalCost);
  booking.totalCost = totalCost;
  await booking.save();
  return booking;
};
export const CarService = {
  createCarIntoDB,
  getAllCarIntoDB,
  getSingleCarIntoDB,
  updateCarIntoDB,
  deleteCarFromDB,
  returnCarIntoDB,
};
