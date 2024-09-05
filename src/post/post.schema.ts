import { z, ZodType } from 'zod';

export class PostSchema {
  static readonly PostInputData: ZodType = z
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

export type PostInputData = z.infer<typeof PostSchema.PostInputData>;
