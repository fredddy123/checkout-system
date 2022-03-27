import { Test, TestingModule } from '@nestjs/testing';
import { DbModule } from 'src/db/db.module';
import { PromotionService } from './promotion.service';

describe('PromotionService', () => {
  let service: PromotionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DbModule],
      providers: [PromotionService],
    }).compile();

    service = module.get<PromotionService>(PromotionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
