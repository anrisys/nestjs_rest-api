import {
  BadRequestException,
  ArgumentMetadata,
  PipeTransform,
  Injectable,
} from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';

// TODO: Modify the error throwing to make it more readble
@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      if (metadata.type === 'body') {
        const parsedValue = this.schema.parse(value);
        return parsedValue;
      } else if (metadata.type === 'custom') {
        if (!value) {
          throw new BadRequestException();
        }
        return value;
      }
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(
          error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        );
      }
    }
  }
}
