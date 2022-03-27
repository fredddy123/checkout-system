import { HttpStatus } from '@nestjs/common';

export interface IFormedResponse<T> {
  status: HttpStatus;
  data: T;
}
