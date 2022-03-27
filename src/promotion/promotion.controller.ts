import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('promotion')
@UseGuards(AuthGuard)
export class PromotionController {}
