import { MaxFileSizeError } from '@/application/errors';
import { Validator } from '@/application/validation';

export class MaxFileSize implements Validator {
  constructor(
    private readonly masSizeInMb: number,
    private readonly value: Buffer
  ) {}

  validate(): Error | undefined {
    const maxFileSizeInBytes = 5 * 1024 * 1024;
    if (this.value.length > maxFileSizeInBytes)
      return new MaxFileSizeError(this.masSizeInMb);
  }
}
