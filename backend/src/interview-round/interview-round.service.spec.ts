import { Test, TestingModule } from '@nestjs/testing';
import { InterviewRoundService } from './interview-round.service';

describe('InterviewRoundService', () => {
  let service: InterviewRoundService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InterviewRoundService],
    }).compile();

    service = module.get<InterviewRoundService>(InterviewRoundService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
