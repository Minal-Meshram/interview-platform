import { Test, TestingModule } from '@nestjs/testing';
import { InterviewRoundController } from './interview-round.controller';

describe('InterviewRoundController', () => {
  let controller: InterviewRoundController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterviewRoundController],
    }).compile();

    controller = module.get<InterviewRoundController>(InterviewRoundController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
