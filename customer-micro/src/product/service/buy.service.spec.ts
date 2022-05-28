import { Test, TestingModule } from '@nestjs/testing';
import { BuyService } from './buy.service';

describe('BuyService', () => {
  let service: BuyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuyService],
    }).compile();

    service = module.get<BuyService>(BuyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
