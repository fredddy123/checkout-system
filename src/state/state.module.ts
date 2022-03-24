import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { StateController } from './state.controller';

@Module({
  imports: [AuthModule],
  controllers: [StateController],
})
export class StateModule {}
