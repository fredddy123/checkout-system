import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService, AuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
