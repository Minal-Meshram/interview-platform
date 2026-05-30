import { Test, TestingModule } from '@nestjs/testing';
import { UserQuestionModeService } from './user-question-mode.service';

describe('UserQuestionModeService', () => {
  let service: UserQuestionModeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserQuestionModeService],
    }).compile();

    service = module.get<UserQuestionModeService>(UserQuestionModeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
