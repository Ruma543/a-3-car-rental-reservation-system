import { Schema, model } from 'mongoose';
import { TBookingId } from './return.interface';

const bookingSchema = new Schema<TBookingId>({
  bookingId: { type: Schema.Types.ObjectId, required: true },
  endTime: { type: String, required: true },
});
export const BookingId = model<TBookingId>('BookingId', bookingSchema);
