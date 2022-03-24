import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { StateDTO, Status } from './dto/get-state.dto';

@Controller('state')
@UseGuards(AuthGuard)
export class StateController {
  @Get()
  async find(): Promise<StateDTO[]> {
    return [
      {
        id: 'id1',
        status: Status.READY,
        scannedProducts: [
          {
            id: 'id1',
            externalId: 'externalId1',
            title: 'title1',
            basePrice: 100,
            finalPrice: 90,
          },
        ],
        appliedPromotions: [
          {
            id: 'id2',
            condition: 'condition2',
          },
        ],
      },
    ];
  }
}
