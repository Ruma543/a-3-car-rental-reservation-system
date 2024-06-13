import { Types } from 'mongoose';

export type TBookingId = {
  bookingId: Types.ObjectId;
  endTime: string;
};
