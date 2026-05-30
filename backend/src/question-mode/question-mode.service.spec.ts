import { Test, TestingModule } from '@nestjs/testing';
import { QuestionModeService } from './question-mode.service';

describe('QuestionModeService', () => {
  let service: QuestionModeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionModeService],
    }).compile();

    service = module.get<QuestionModeService>(QuestionModeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
