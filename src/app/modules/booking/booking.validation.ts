import { z } from 'zod';
const timeStringSchema = z.string().refine(
  time => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
    return regex.test(time);
  },
  {
    message: 'Invalid time format , expected "HH:MM" in 24 hours format',
  }
);
const createCarValidationSchema = z.object({
  body: z
    .object({
      startTime: timeStringSchema, // HH: MM   00-23: 00-59
      endTime: timeStringSchema,
      user: z.string(),
      car: z.string(),
    })
    .refine(
      body => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return end > start;
      },
      {
        message: 'Start time should be before End time !  ',
      }
    ),
});
