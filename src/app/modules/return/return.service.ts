import { number } from 'zod';
import { TBooking } from '../booking/booking.interface';
import { Booking } from '../booking/booking.model';

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
  console.log(booking.car);
  const startTimes = booking.startTime;
  const endTimes = booking.endTime;
  const pricePerHour = (booking.car as { pricePerHour: number }).pricePerHour;
  console.log(pricePerHour, startTimes, endTimes);

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
  console.log('hour', durationInHours, totalCost);
  booking.totalCost = totalCost;
  await booking.save();
  return booking;
};
export const ReturnService = {
  returnCarIntoDB,
};
