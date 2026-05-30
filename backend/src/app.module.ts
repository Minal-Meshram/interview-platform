import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModeModule } from './question-mode/question-mode.module';
import { InterviewRoundModule } from './interview-round/interview-round.module';
import { UserQuestionModeModule } from './user-question-mode/user-question-mode.module';
import { AuthModule } from './auth/auth.module';
import { UserAuthModule } from './user-auth/user-auth.module';

@Module({
  imports: [QuestionModeModule, InterviewRoundModule, UserQuestionModeModule, AuthModule, UserAuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
