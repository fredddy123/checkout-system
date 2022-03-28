import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { IFormedResponse } from 'src/types/formed-response';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { PromotionService } from './promotion.service';
import { IPromotion } from './types/promotion';

@Controller('promotion')
@UseGuards(AuthGuard)
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Post()
  async createPromotion(
    @Body() data: CreatePromotionDto,
  ): Promise<IFormedResponse<{ id: string }>> {
    const id = await this.promotionService.createPromotion(data);

    return {
      status: HttpStatus.OK,
      data: {
        id,
      },
    };
  }

  @Get()
  async findAll(): Promise<IFormedResponse<IPromotion[]>> {
    const products = await this.promotionService.getAllPromotions();

    return {
      status: HttpStatus.OK,
      data: products,
    };
  }
}
