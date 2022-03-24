import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StateService } from './state/state.service';
import { StateModule } from './state/state.module';

@Module({
  imports: [StateModule],
  controllers: [AppController],
  // providers: [AppService, StateService, AuthService],
  providers: [AppService, StateService],
})
export class AppModule {}
