import { z, ZodType } from 'zod';

export class UserValidation {
  static readonly REGISTER: ZodType = z.object({
    name: z
      .string()
      .min(1, 'Name is required')
      .max(100, "Name can't exceed 100 characters"),
    email: z
      .string()
      .email('Invalid email address')
      .min(1, 'Email is required')
      .max(255, "Email can't exceed 250 characters"),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(100, "Password can't exceed 100 characters"),
  });

  static readonly LOGIN: ZodType = z.object({
    email: z
      .string()
      .email('Invalid email address')
      .min(1, 'Email is required')
      .max(255, "Email can't exceed 250 characters"),
    password: z
      .string()
      .min(1, 'Password can not be empty')
      .max(100, "Password can't exceed 100 characters"),
  });
}
