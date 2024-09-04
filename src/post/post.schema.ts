import { z, ZodType } from 'zod';

export class PostValidation {
  static readonly CREATE: ZodType = z
    .object({
      content: z
        .string({
          required_error: 'Content is required',
          invalid_type_error: 'Content must be string',
        })
        .trim()
        .min(1, 'Content can not be blank'),
    })
    .required();
}

export type CreatePostDto = z.infer<typeof PostValidation.CREATE>;
