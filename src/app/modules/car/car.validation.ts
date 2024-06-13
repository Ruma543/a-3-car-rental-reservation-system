import { z } from 'zod';
const createCarValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    color: z.string(),
    isElectric: z.boolean(),
    features: z.array(z.string()).min(1, 'At least one feature is required'),
    pricePerHour: z
      .number()
      .positive('Price per hour must be a positive number'),
    status: z.enum(['available', 'unavailable']).default('available'),
    isDeleted: z.boolean().default(false),
  }),
});
const updateCarValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    color: z.string().optional(),
    isElectric: z.boolean().optional(),
    features: z.array(z.string()).optional(),
    pricePerHour: z
      .number()
      .positive('Price per hour must be a positive number')
      .optional(),
    status: z.enum(['available', 'unavailable']).optional(),
    isDeleted: z.boolean().optional(),
  }),
});
export const CarValidation = {
  createCarValidationSchema,
  updateCarValidationSchema,
};
