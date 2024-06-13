import { z } from 'zod';

const createCarValidationSchema = z.object({
  body: z.object({
    date: z.string(),
    startTime: z.string(),
  }),
});
export const BookingValidation = {
  createCarValidationSchema,
};
