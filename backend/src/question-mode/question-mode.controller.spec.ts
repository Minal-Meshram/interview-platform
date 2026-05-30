import { Test, TestingModule } from '@nestjs/testing';
import { QuestionModeController } from './question-mode.controller';

describe('QuestionModeController', () => {
  let controller: QuestionModeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionModeController],
    }).compile();

    controller = module.get<QuestionModeController>(QuestionModeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
