import { z } from 'zod';

const signInValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'email is required.' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

export const AuthValidation = {
  signInValidationSchema,
};
