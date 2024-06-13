import { Types } from 'mongoose';

export type TCar = {
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  features: string[];
  pricePerHour: number;
  status: 'available' | 'unavailable';
  isDeleted: boolean;
};
// export type TBookingId = {
//   bookingId: Types.ObjectId;
//   endTime: string;
// };
