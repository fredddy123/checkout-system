import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class PromotionService {
  constructor(private readonly dbService: DbService) {}
  applyPromotions(product, allScannedProducts) {
    const promotionsRelatedToProduct = await this.dbService.
  }
}
