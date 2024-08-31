import { z, ZodType } from 'zod';

export class PostValidation {
  static readonly CREATE: ZodType = z.object({
    content: z
      .string({
        required_error: 'Content is required',
        invalid_type_error: 'content must be string',
      })
      .trim()
      .min(1, 'Content can not be blank'),
    authorId: z.number({
      required_error: 'Author ID is required',
      invalid_type_error: 'Author ID must be a number',
    }),
  });
}
